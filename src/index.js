const probabilities = [
  { message: "꽝", probability: 87 },
  { message: "1등", probability: 2 },
  { message: "2등", probability: 4 },
  { message: "3등", probability: 7 }
];

const init = [];

document.getElementById('startButton').addEventListener('click', function() {
  this.style.display = 'none';

  for (let i = 0; i < 20; i++) {
      createFloatingDiv();
  }

  // 5초 후에 게임 종료
  setTimeout(endGame, 5000);
});

function createFloatingDiv() {
  const div = document.createElement('div');
  div.classList.add('floatingDiv');

  // 브라우저의 너비와 높이를 가져옴
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // div의 위치와 애니메이션 시간을 랜덤하게 설정
  const randomLeft = Math.random() * (viewportWidth - 50); // 50px는 div의 너비
  const randomBottom = 0; // 하단에서 시작
  const randomDuration = Math.random() * 3 + 1; // 1초에서 5초 사이의 랜덤 시간

  // div에 랜덤 위치와 애니메이션 시간 설정
  div.style.left = `${randomLeft}px`;
  div.style.bottom = `${randomBottom}px`;
  div.style.animationDuration = `${randomDuration}s`;

  div.addEventListener('click', function() {
    const randomMsg = getRandomMessage()
      div.textContent = randomMsg;
      init.push(randomMsg);
      setTimeout(() => {
          div.remove();
      }, 1000);
  });

  div.addEventListener('animationend', function() {
      div.remove();
  });

  document.body.appendChild(div);
}

function endGame() {
  // 게임이 끝난 즉시 풍선 제거
  const allDivs = document.querySelectorAll('.floatingDiv');
  allDivs.forEach(div => div.remove());

  ending();
}

const ending = () => {
  const div = document.createElement('div');
  div.textContent = "게임 종료";
  document.body.appendChild(div); // DOM에 추가
  console.log(init);
}

function getRandomMessage() {
  const totalProbability = probabilities.reduce((sum, item) => sum + item.probability, 0);
  const random = Math.random() * totalProbability;
  let cumulative = 0;

  for (const item of probabilities) {
      cumulative += item.probability;
      if (random < cumulative) {
          return item.message;
      }
  }
}
