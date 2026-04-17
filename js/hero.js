/**
 * hero.js — 키링 히어로 페이지
 * people.json에서 데이터 로드 → 키링 렌더링
 */
(async () => {
  try {
    const res = await fetch('data/people.json');
    const people = await res.json();
    renderKeyrings(people);
  } catch (err) {
    console.error('데이터 로드 실패:', err);
    document.getElementById('keyrings').innerHTML =
      '<p style="text-align:center;color:rgba(255,255,255,.5);font-style:italic;">데이터를 불러오지 못했어요.<br><small>npx serve . 로 서버를 실행해주세요.</small></p>';
  }
})();

function renderKeyrings(people) {
  const container = document.getElementById('keyrings');

  const teacherGroup = makeGroup('🎓 선생님', people.teachers);
  const helperGroup = makeGroup('⭐ 도우미', people.helpers);

  container.appendChild(teacherGroup);
  container.appendChild(helperGroup);

  // stagger animation
  const keyrings = container.querySelectorAll('.keyring');
  keyrings.forEach((k, i) => {
    k.style.animationDelay = `${i * 0.1}s`;
  });
}

function makeGroup(label, list) {
  const group = document.createElement('div');
  group.className = 'keyring-group';

  const labelEl = document.createElement('div');
  labelEl.className = 'keyring-group-label';
  labelEl.textContent = label;
  group.appendChild(labelEl);

  list.forEach((person, i) => {
    const link = document.createElement('a');
    link.className = 'keyring';
    link.href = `person.html?id=${person.id}`;
    link.style.setProperty('--glow', getGlow(i));

    link.innerHTML = `
      <div class="keyring-ring"></div>
      <div class="keyring-chain"></div>
      <div class="keyring-body">
        ${person.photo
          ? `<img class="keyring-photo" src="${person.photo}" alt="${person.name}"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''}
        <div class="keyring-emoji" style="${person.photo ? 'display:none' : ''}">${person.emoji || '🎵'}</div>
      </div>
      <span class="keyring-name">${person.name}</span>
    `;

    group.appendChild(link);
  });

  return group;
}

function getGlow(i) {
  const glows = [
    'rgba(255,100,180,.4)',
    'rgba(100,180,255,.4)',
    'rgba(255,200,100,.4)',
    'rgba(180,100,255,.4)',
    'rgba(100,255,200,.4)',
    'rgba(255,150,100,.4)',
    'rgba(150,200,255,.4)',
  ];
  return glows[i % glows.length];
}
