const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const ciphers = [
  {
    id: 'alberti',
    num: '01',
    year: '1467년',
    tag: '다중 치환 암호',
    title: '알베르티 암호',
    meta: 'Leon Battista Alberti · 1467 · 이탈리아',
    desc: [
      '르네상스 시대의 건축가·수학자 알베르티가 고안한 암호. 두 개의 동심원 디스크를 이용해 암호화 키를 주기적으로 바꾸는 방식으로, 역사상 최초의 다중 문자 치환 암호로 평가받는다.',
      '기존 단순 치환 암호는 알파벳 빈도 분석으로 쉽게 해독됐지만, 알베르티 방식은 같은 글자도 매번 다른 기호로 암호화되어 빈도 분석을 무력화했다.',
    ],
    point:
      '알베르티는 "현대 암호학의 아버지"로 불린다. 그의 다중 알파벳 개념은 이후 비즈네르 암호의 직접적인 토대가 되었다.',
    demoType: 'alberti',
  },
  {
    id: 'vigenere',
    num: '02',
    year: '1553년',
    tag: '키워드 기반 암호',
    title: '비즈네르 암호',
    meta: 'Blaise de Vigenère · 1553 · 프랑스',
    desc: [
      '프랑스 외교관 비즈네르가 체계화한 암호. 키워드를 반복 적용해 각 글자를 서로 다른 방식으로 치환하기 때문에 단순 빈도 분석으로는 해독이 불가능하다.',
      '키워드가 "KEY"이면 첫 글자는 K(10)만큼, 둘째는 E(4)만큼, 셋째는 Y(24)만큼 밀고 반복한다. 같은 평문 글자도 위치에 따라 다른 암호문이 된다.',
    ],
    point:
      '약 300년간 "해독 불가능한 암호(le chiffre indéchiffrable)"로 불렸다. 1863년 카시스키가 키 길이를 통계적으로 추정하는 방법을 발견해 해독에 성공했다.',
    demoType: 'vigenere',
  },
]

function buildPage() {
  const container = document.getElementById('pageContainer')

  const header = document.createElement('div')
  header.className = 'page-header'
  header.innerHTML =
    '<h1>중세 암호</h1><p>르네상스 시대의 외교관과 학자들이 고안한 정교한 암호 체계</p>'
  container.appendChild(header)

  ciphers.forEach((cipher) => {
    const divider = document.createElement('div')
    divider.className = 'section-divider'
    divider.innerHTML = `<span>${cipher.num} · ${cipher.year}</span>`
    container.appendChild(divider)

    const block = document.createElement('div')
    block.className = 'cipher-block'
    block.innerHTML = `
      <div class="cipher-info">
        <span class="cipher-tag">${cipher.tag}</span>
        <h2>${cipher.title}</h2>
        <p class="cipher-year">${cipher.meta}</p>
        ${cipher.desc.map((d) => `<p>${d}</p>`).join('')}
        <div class="cipher-point">${cipher.point}</div>
      </div>
      <div class="cipher-demo" id="demo-${cipher.id}"></div>
    `
    container.appendChild(block)

    if (cipher.demoType === 'alberti') buildAlbertiDemo(cipher.id)
    if (cipher.demoType === 'vigenere') buildVigenereDemo(cipher.id)
  })
}

// ── 알베르티 데모 ──
function buildAlbertiDemo(id) {
  const demo = document.getElementById(`demo-${id}`)
  demo.innerHTML = `
    <div class="demo-title">🔴 알베르티 디스크 시뮬레이션</div>
    <div class="alberti-disk">
      <div class="disk-wrap">
        <div id="outerDisk"></div>
        <div id="innerDisk"></div>
      </div>
    </div>
    <div class="demo-label">디스크 회전 (키)</div>
    <div class="demo-slider-row">
      <input type="range" min="0" max="25" value="3" id="albertiShift">
      <span class="demo-slider-val" id="albertiShiftVal">3</span>
    </div>
    <div class="demo-label">입력 텍스트</div>
    <input class="demo-input" type="text" id="albertiInput" placeholder="HELLO" value="HELLO">
    <div class="demo-label">암호화 결과</div>
    <div class="demo-output-box" id="albertiOutput"></div>
    <div class="btn-group">
      <button class="demo-btn" id="albertiCopyBtn">복사</button>
      <button class="demo-btn" id="albertiClearBtn">초기화</button>
    </div>
  `

  document.getElementById('albertiShift').addEventListener('input', () => {
    document.getElementById('albertiShiftVal').textContent =
      document.getElementById('albertiShift').value
    renderDisk()
    runAlberti()
  })
  document.getElementById('albertiInput').addEventListener('input', runAlberti)

  document.getElementById('albertiCopyBtn').addEventListener('click', () => {
    const val = document.getElementById('albertiOutput').textContent
    navigator.clipboard.writeText(val).then(() => {
      const btn = document.getElementById('albertiCopyBtn')
      btn.textContent = '복사됨!'
      btn.classList.add('success')
      setTimeout(() => {
        btn.textContent = '복사'
        btn.classList.remove('success')
      }, 1500)
    })
  })

  document.getElementById('albertiClearBtn').addEventListener('click', () => {
    document.getElementById('albertiInput').value = 'HELLO'
    document.getElementById('albertiShift').value = 3
    document.getElementById('albertiShiftVal').textContent = '3'
    renderDisk()
    runAlberti()
  })

  function runAlberti() {
    const text = document.getElementById('albertiInput').value.toUpperCase()
    const shift = parseInt(document.getElementById('albertiShift').value)
    const result = text
      .split('')
      .map((c) =>
        c >= 'A' && c <= 'Z' ? ALPHA[(c.charCodeAt(0) - 65 + shift) % 26] : c,
      )
      .join('')
    document.getElementById('albertiOutput').textContent = result || '—'
  }

  renderDisk()
  runAlberti()
}

// ── 비즈네르 데모 ──
function buildVigenereDemo(id) {
  const demo = document.getElementById(`demo-${id}`)
  demo.innerHTML = `
    <div class="demo-title">
      🔑 비즈네르 암호화 체험
      <div class="tab-btns">
        <button class="tab-btn active" id="vigTabSim">시뮬레이션</button>
        <button class="tab-btn" id="vigTabTable">비즈네르 표</button>
      </div>
    </div>

    <div id="vigSimPanel">
      <div class="demo-label">평문 입력</div>
      <input class="demo-input" type="text" id="vigInput" placeholder="HELLO" value="HELLO">
      <div class="demo-label">키워드</div>
      <input class="demo-input" type="text" id="vigKey" placeholder="KEY" value="KEY">
      <div class="demo-label">암호화 결과</div>
      <div class="demo-output-box" id="vigOutput"></div>
      <div class="demo-label">키 매핑</div>
      <div class="demo-output-box" id="vigMapping" style="font-size:0.75rem;color:#6b7280;"></div>
      <div class="btn-group">
        <button class="demo-btn" id="vigCopyBtn">복사</button>
        <button class="demo-btn" id="vigClearBtn">초기화</button>
      </div>
    </div>

    <div id="vigTablePanel" style="display:none;">
      <p class="demo-label" style="margin-bottom:8px;">암호화 과정을 비즈네르 표를 통해 확인해보기</p>
      <div id="vtableContainer"></div>
    </div>
  `

  // 탭 전환
  document.getElementById('vigTabSim').addEventListener('click', () => {
    document.getElementById('vigSimPanel').style.display = 'flex'
    document.getElementById('vigTablePanel').style.display = 'none'
    document.getElementById('vigTabSim').classList.add('active')
    document.getElementById('vigTabTable').classList.remove('active')
  })
  document.getElementById('vigTabTable').addEventListener('click', () => {
    document.getElementById('vigSimPanel').style.display = 'none'
    document.getElementById('vigTablePanel').style.display = 'block'
    document.getElementById('vigTabSim').classList.remove('active')
    document.getElementById('vigTabTable').classList.add('active')
    runVigenere() // 표 최신 상태로 갱신
  })

  document.getElementById('vigInput').addEventListener('input', runVigenere)
  document.getElementById('vigKey').addEventListener('input', runVigenere)

  document.getElementById('vigCopyBtn').addEventListener('click', () => {
    const val = document.getElementById('vigOutput').textContent
    navigator.clipboard.writeText(val).then(() => {
      const btn = document.getElementById('vigCopyBtn')
      btn.textContent = '복사됨!'
      btn.classList.add('success')
      setTimeout(() => {
        btn.textContent = '복사'
        btn.classList.remove('success')
      }, 1500)
    })
  })

  document.getElementById('vigClearBtn').addEventListener('click', () => {
    document.getElementById('vigInput').value = 'HELLO'
    document.getElementById('vigKey').value = 'KEY'
    runVigenere()
  })

  function runVigenere() {
    const text = document
      .getElementById('vigInput')
      .value.toUpperCase()
      .replace(/[^A-Z]/g, '')
    const key =
      document
        .getElementById('vigKey')
        .value.toUpperCase()
        .replace(/[^A-Z]/g, '') || 'A'

    if (!text) {
      document.getElementById('vigOutput').textContent = '—'
      document.getElementById('vigMapping').textContent =
        '평문: \n키:   \n결과: '
      buildVigenereTable()
      return
    }

    let result = '',
      keyDisplay = ''
    for (let i = 0; i < text.length; i++) {
      const k = key[i % key.length].charCodeAt(0) - 65
      const c = text[i].charCodeAt(0) - 65
      result += ALPHA[(c + k) % 26]
      keyDisplay += key[i % key.length]
    }
    document.getElementById('vigOutput').textContent = result
    document.getElementById('vigMapping').textContent =
      '평문: ' + text + '\n키:   ' + keyDisplay + '\n결과: ' + result

    highlightTable(text[0].charCodeAt(0) - 65, key[0].charCodeAt(0) - 65)
  }

  runVigenere()
}

// ── 비즈네르 표 생성 ──
function buildVigenereTable(rowHL = -1, colHL = -1) {
  const container = document.getElementById('vtableContainer')
  if (!container) return
  const table = document.createElement('table')
  table.className = 'vtable'

  const headRow = document.createElement('tr')
  headRow.appendChild(
    Object.assign(document.createElement('td'), {
      className: 'header',
      textContent: '',
    }),
  )
  for (let c = 0; c < 26; c++) {
    const td = document.createElement('td')
    td.className = 'header' + (c === colHL ? ' highlight' : '')
    td.textContent = ALPHA[c]
    headRow.appendChild(td)
  }
  table.appendChild(headRow)

  for (let r = 0; r < 26; r++) {
    const tr = document.createElement('tr')
    const th = document.createElement('td')
    th.className = 'header' + (r === rowHL ? ' highlight' : '')
    th.textContent = ALPHA[r]
    tr.appendChild(th)
    for (let c = 0; c < 26; c++) {
      const td = document.createElement('td')
      if (r === rowHL && c === colHL) td.className = 'highlight'
      else if (r === rowHL) td.className = 'row-hl'
      else if (c === colHL) td.className = 'col-hl'
      td.textContent = ALPHA[(r + c) % 26]
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }
  container.innerHTML = ''
  container.appendChild(table)
}

function highlightTable(row, col) {
  buildVigenereTable(row, col)
}

// ── 알베르티 디스크 렌더링 ──
function renderDisk() {
  const outer = document.getElementById('outerDisk')
  const inner = document.getElementById('innerDisk')
  if (!outer || !inner) return
  outer.innerHTML = ''
  inner.innerHTML = ''
  const shift = parseInt(document.getElementById('albertiShift').value)

  for (let i = 0; i < 26; i++) {
    const angle = (i * 360) / 26 - 90
    const rad = (angle * Math.PI) / 180
    const el = document.createElement('span')
    el.style.cssText = `position:absolute;font-size:9px;font-weight:600;font-family:monospace;color:#4338ca;
      left:${75 + 60 * Math.cos(rad) - 4}px;top:${75 + 60 * Math.sin(rad) - 6}px;`
    el.textContent = ALPHA[i]
    outer.appendChild(el)
  }
  for (let i = 0; i < 26; i++) {
    const angle = (i * 360) / 26 - 90
    const rad = (angle * Math.PI) / 180
    const el = document.createElement('span')
    el.style.cssText = `position:absolute;font-size:8px;font-weight:600;font-family:monospace;color:#6366f1;
      left:${47 + 34 * Math.cos(rad) - 4}px;top:${47 + 34 * Math.sin(rad) - 5}px;`
    el.textContent = ALPHA[(i + shift) % 26]
    inner.appendChild(el)
  }
}

// ── IntersectionObserver 페이드인 ──
function initFadeIn() {
  const targets = document.querySelectorAll(
    '.page-header, .section-divider, .cipher-block, .vigenere-table-wrap',
  )
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )
  targets.forEach((t) => observer.observe(t))
}

buildPage()
initFadeIn()
