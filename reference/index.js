const { max, abs, random } = Math

const lerp = (min, max, value) => {
  return value * (max - min) + min
}

const jigglyPuffAnimationDuration = 15000
const jigglyPuffCanvas = document.querySelector('.jigglypuff-canvas')
const codepenCanvas = document.querySelector('.codepen-canvas')
const interval = 3300
const startTime = Date.now()

const demos = [
  'gONYmNM',
  'WNVvQOV/86dab8913baba43e3ceb3521fdd99aef',
  'rLEooV',
  'YzrMdBM',
  'mdbGvmr',
  'OJyGmWX',
  'yLWgwmR',
  'gxyoXW',
  'KKmYMBY',
  'ExmqYym',
  'VqjvqR',
  'NWEgJbG',
  'NLRxvN',
  'VwKQENg',
  'jOWVOYL',
  'yLKwgyo',
  'aJExoe',
  'QWXOYvz',
  'JGEKJr'
]

let index = 1

const screens = Array.from(
  document.querySelectorAll('iframe')
)

const baseUrl = 'https://cdpn.io/pen/debug'

const setDemo = (screen, demoSlug) => {
  screen.src = `${baseUrl}/${demoSlug}`
  return screen
}

const preloadDemo = (slug, i) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('load', slug)
      const iframe = document.createElement('iframe')
      const screen = setDemo(iframe, slug)
      screen.style.cssText += 'display: none;'
      document.body.appendChild(screen)
      screen.onload = resolve
    }, 1000 * i)
  })
}

const preloadDemos = async () => {
  const start = Date.now()
  // Skipping the first and the last, bc they are in iframe src
  const skip = 1
  const preloadPerTV = 1
  const firstBatchIndex = preloadPerTV + skip
  const firstBatch = demos
    .slice(skip, firstBatchIndex)
    .concat(demos.slice(-1 * firstBatchIndex, skip * -1))
  await Promise.all(firstBatch.map(preloadDemo))
  
  // remaining demos
  const lastBatch = demos.slice(firstBatchIndex, -1 * firstBatchIndex)

  // defer remaining demos to when codepen stops preview
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('time since start', Date.now() - startTime)
      console.log('load the remaining', lastBatch)
      resolve(
        Promise.all(
          lastBatch.map((slug, i) => {
            return preloadDemo(slug, i)
          })
        )
      )
    }, 4500)
  })
}

const start = () => {
  setInterval(async () => {
    const demoIndex = index === demos.length
      ? (index = 0)
      : index++
    const demo = demos[demoIndex]
    setDemo(screens[0], demo)

    // meh...
    const reverseIndex = index === demos.length ? 0 :
      (index === 0 ? demos.length - 1 : demos.length - index)

    setTimeout(() => {
      const demo = demos[reverseIndex]
      setDemo(screens[1], demo)
    }, interval / 3)
  }, interval)

}

const youtube = document.querySelector('.youtube')
const videoUrl = 'https://www.youtube-nocookie.com/embed/DfcWOPpmw14?autoplay=1'

// Jigglypuff code taken from: 
// https://codepen.io/Adamanska/pen/gNYdRZ
const initJugglypuff = () => {
  let isSpinning = true;
  const TAU = Zdog.TAU;
  const pink = '#F6CED7';
  const blue = '#006885';
  const dark = '#383336';

  const illo = new Zdog.Illustration({
    element: jigglyPuffCanvas,
    rotate: { y: -TAU/4 },
    dragRotate: true,
    onDragStart: function() {
      isSpinning = false;
    },
  });

  var body = new Zdog.Shape({
    addTo: illo,
    stroke: 380,
    color: pink,
  });

  // ====== EYES =======
  var eyes = new Zdog.Group({
    addTo:illo,
    translate: { z: 160, x : -90 },
    rotate: { y: TAU/10 },
  })
  let eye = new Zdog.Ellipse({
    addTo: eyes,
    diameter: 120,
    stroke: 1,
    fill: true,
    color: '#fff',
  });
  let pupil = new Zdog.Ellipse({
    addTo: eyes,
    diameter: 80,
    stroke: 1,
    fill: true,
    color: blue,
  });
  let shine = new Zdog.Ellipse({
    addTo: eyes,
    diameter: 20,
    stroke: 1,
    translate: { x: 10, y: -20 },
    fill: true,
    color: '#fff',
  });
  eyes.copyGraph({
    addTo:illo,
    translate: { z: 160, x : 90 },
    rotate: { y: -TAU/10 },
  });

  // ====== EARS ======
  var ears = new Zdog.Group({
    addTo: illo,
    translate: { z: 0, x : -130, y :-150},
    rotate: {z: 35}
  })
  let leftEar = new Zdog.Shape({
    addTo: ears,
    path: [
      { x:   0, y: -80 },
      { x:  60, y: 60 },
      { x: -60, y: 60 },
    ],
    fill: true,
    stroke: 20,
    color: pink,
  });
  let leftInside = new Zdog.Shape({
    addTo: ears,
    path: [
      { x:   0, y: -30 },
      { x:  30, y: 30 },
      { x: -50, y: 30 },
    ],
    fill: true,
    stroke: 10,
    color: dark,
    translate: { z: 8,  },
  });
  var otherEars = new Zdog.Group({
    addTo: illo,
    translate: { z: 0, x : 130, y :-150},
    rotate: {z: -35}
  })
  let rightEar = new Zdog.Shape({
    addTo: otherEars,
    path: [
      { x:   0, y: -80 },
      { x:  60, y: 60 },
      { x: -60, y: 60 },
    ],
    fill: true,
    stroke: 20,
    color: pink,
  });
  let rightInside = new Zdog.Shape({
    addTo: otherEars,
    path: [
      { x:   0, y: -30 },
      { x:  30, y: 30 },
      { x: -35, y: 30 },
    ],
    fill: true,
    stroke: 1,
    color: dark,
    //translate: { z: 8,  },
  });

  // ====== FEET ======
  var feet = new Zdog.Group({
    addTo: illo,
    translate: { z: 30, x : -100, y :170},
    rotate: {y: -50}
  })
  let leftFoot = new Zdog.Shape({
    addTo: feet,
    path: [ // triangle
      { z:   0, x: 0 },
      { z:  50, x:  40 },
      { z: -40, x:  40 },
      { z: -40, x:  0 },
    ],
    fill: true,
    stroke: 70,
    color: pink,
  });
  //feet.copyGraph({
  //addTo: illo,
  //translate: { z: 30, x : 70, y :170},
  //rotate: {y: TAU/12}
  //})
  var feet2 = new Zdog.Group({
    addTo: illo,
    translate: { z: 0, x : 80, y :170},
    //rotate: {y: -50}
  })
  let rFoot = new Zdog.Shape({
    addTo: feet2,
    path: [ // triangle
      { z:   0, x: 0 },
      { z:  40, x:  40 ,},// pointe
      { z: -20, x:  20 },
      { z: -40, x:  0 },
    ],
    fill: true,
    stroke: 70,
    color: pink,
    rotate: {y: TAU/22},
  });

  // ====== SMILE ======
  let smile = new Zdog.Ellipse({
    addTo: illo,
    diameter: 40,
    quarters: 2,
    stroke: 4,
    color: dark,
    rotate:{z: TAU/4},
    translate: { z: 190, x : 0, y :30},
  });

  // ====== ARMS ======
  var arms = new Zdog.Group({
    addTo: illo,
    translate: { z: 0, x : -190, y :50},
    rotate: {y: -50}
  })
  let lArms = new Zdog.Shape({
    addTo: arms,
    path: [ // triangle
      { z:   40, x: -0, y:30 },
      { z:  50, x:  50 },
      { z: -20, x:  20 },
    ],
    fill: true,
    stroke: 50,
    color: pink,
  });
  var arms2 = new Zdog.Group({
    addTo: illo,
    translate: { z: 0, x : 190, y :50},
    rotate: {y: 50}
  })
  let rArms = new Zdog.Shape({
    addTo: arms2,
    path: [ // triangle
      { z:   40, x: 0, y:30 },
      { z:  -50, x:  -50 },
      { z: 20, x:  -20 },
    ],
    fill: true,
    stroke: 50,
    color: pink,
  });

  // ====== HAIR ======
  var hair = new Zdog.Group({
    addTo: illo,
    translate: { z: 60, x : 0, y :-150},
    //rotate: {y: -50}
  })

  var meche = new Zdog.Shape({
    addTo: hair,
    stroke: 150,
    color: pink,
  });

  var hairSmallMid = new Zdog.Shape({
    addTo: hair,
    stroke: 120,
    color: pink,
    translate: { z: 30, x : 0, y :0},
  });

  var hairSmall = new Zdog.Shape({
    addTo: hair,
    stroke: 120,
    color: pink,
    translate: { z: 50, x : 0, y :20},
  });

  setInterval(() => {
    illo.rotate.y = -1.5 - random()
    jigglyPuffCanvas.style.setProperty(
      '--stop-1', `${lerp(10, 35, random())}%`
    )
    jigglyPuffCanvas.style.setProperty(
      '--stop-2', `${lerp(10, 35, random())}%`
    )
    jigglyPuffCanvas.style.setProperty(
      '--stop-3', `${lerp(10, 35, random())}%`
    )
  }, jigglyPuffAnimationDuration)

  function animate() {
    illo.rotate.y += 0.005;
    illo.rotate.z += 0.00125;
    illo.updateRenderGraph();
    requestAnimationFrame( animate );
  }

  animate();
}

// codepen logo is taken from:
// https://codepen.io/danhearn/pen/XwQrXJ
const initCodepen = (element) => {
  let isSpinning = false
  let isMusic = false
  const illo = new Zdog.Illustration({
    element: codepenCanvas,
    dragRotate: true,
    onDragStart: function() {
      isSpinning = false
    },
    onDragEnd: function() {
      isSpinning = true
      if (isMusic) {
        youtube.setAttribute('src', '')
      } else {
        youtube.setAttribute('src', videoUrl)
      }
      isMusic = !isMusic
    },
  });

  const color = '#ff0'
  const thickness = 5
  const size = 60
  const spacing = size*1.1

  let anchor = new Zdog.Anchor({
    addTo: illo,
    scale: 1,
    rotate: { z: -Zdog.TAU/8, x: -Zdog.TAU/7 },
  });

  const bottomRect = new Zdog.Rect({
    addTo: anchor,
    width: size*2,
    height: size*2,
    stroke: thickness,
    color: color
  });

  bottomRect.copy({
    translate: { z: spacing },
    color: color
  });


  const topLine = new Zdog.Shape({
    addTo: bottomRect,
    translate: { x: size, y: size },
    path: [
      { z: 0 },
      { z: spacing },
    ],
    stroke: thickness,
    color: color,
  });

  topLine.copy({
    translate: { x: size, y: -size },
    color: color
  });

  topLine.copy({
    translate: { x: -size, y: size },
    color: color
  });

  topLine.copy({
    translate: { x: -size, y: -size },
    color: color
  });

  let direction = 1
  const range = 48
  const ceiling = range / 2
  const floor = range / -2
  const step = 1000
  function animate() {
    illo.updateRenderGraph();
    if (direction === 1) {
      if (illo.rotate.y <= ceiling - 0.01) {
        const diff = ceiling - illo.rotate.y
        illo.rotate.y += max(diff / step, 0.01)
      } else {
        direction = 0
      }
    }
    if (direction === 0) {
      if (illo.rotate.y >= floor + 0.01) {
        const diff = abs(floor - illo.rotate.y)
        illo.rotate.y -= max(diff / step, 0.01)
      } else {
        direction = 1
      }
    }
    requestAnimationFrame( animate );
  }

  animate();
}

preloadDemos().then(() => console.log('all requests sent', Date.now() - startTime))
start()
initJugglypuff()
initCodepen()