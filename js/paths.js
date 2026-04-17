/**
 * paths.js — 사진 경로 상수
 *
 * 인물별 폴더명, 뱃지, 사진을 한곳에서 관리
 */

const PEOPLE_DIR = 'images/people';

const GROUP_FOLDER = '0-group';
const GROUP_PHOTOS = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg', '7.jpeg', '8.jpeg', '9.jpeg', '11.jpeg', '12.jpeg', '13.jpeg', '14.jpeg', '15.jpeg', '16.jpeg', '17.jpeg', '18.jpeg', '19.jpeg', '20.jpeg', '21.jpeg', '22.gif', '23.jpeg', '24.jpeg', '25.jpeg', '26.jpeg', '27.jpeg', '28.jpeg', '29.jpeg', '30.jpeg', '31.jpeg', '32.jpeg', '33.jpeg', '34.jpeg', '35.jpeg'];

const PEOPLE_FOLDER = {
  jerry: '1-jerry',
  redshoes: '2-redshoes',
  songhi: '3-songhi',
  gray: '4-gray',
  seobuk: '5-seobuk',
  hyo: '6-hyo',
  smaller: '7-smaller',
  danny: '8-danny',
  iri: '9-iri',
  dajeong: '10-dajeong',
  choco: '11-choco'
};

// 뱃지 이미지 (index.html 카드용)
const PEOPLE_BADGES = {
  jerry: ['badge-1.png', 'badge-2.png'],
  redshoes: ['badge-1.png', 'badge-2.png'],
  songhi: ['badge-1.png', 'badge-2.png'],
  gray: ['badge-1.png', 'badge-2.png'],
  seobuk: ['badge-2.png', 'badge-3.png'],
  hyo: ['badge-1.png'],
  smaller: ['badge-1.png', 'badge-2.png'],
  danny: ['badge-1.jpg', 'badge-2.png'],
  iri: ['badge-1.png', 'badge-2.png'],
  dajeong: ['badge-1.png', 'badge-2.png'],
  choco: ['badge-1.png', 'badge-2.png']
};

// 활동 사진 (person.html 슬라이더용)
const PEOPLE_PHOTOS = {
  jerry: ['1.jpeg', '2.png', '3.png', '5.jpg', '6.jpeg', '6.jpg', '9.jpeg', '8.jpeg', '7.jpeg', '11.jpeg'],
  redshoes: ['1.jpeg', '2.png', '3.png', '5.png', '6.jpg', '7.jpeg', '7.jpg'],
  songhi: ['14.jpeg', '2.png', '3.png', '4.png', '13.jpeg', '6.jpeg', '7.png', '9.jpg', '10.jpeg', '11.jpeg', '12.jpeg'],
  gray: ['1.jpeg', '2.jpeg', '3.png', '5.jpeg', '6.jpeg', '6.png', '7.jpeg', '8.jpeg', '9.jpeg', '11.jpeg', '12.jpeg', '13.jpeg'],
  seobuk: ['1.png', '2.png', '3.png', '4.jpg', '5.jpeg', '6.jpg', '8.jpeg', '10.jpeg'],
  hyo: ['1.png', '3.jpeg', '4.jpeg', '5.jpeg'],
  smaller: ['1.jpeg', '2.png', '3.png', '5.jpeg', '6.jpeg', '6.png', '7.jpeg', '8.png', '9.png'],
  danny: ['2.jpeg', '3.png', '4.png', '5.jpg', '5.jpeg'],
  iri: ['1.jpg', '2.jpg'],
  dajeong: ['1.png', '2.jpg', '3.jpeg', '4.jpeg', '5.jpeg'],
  choco: ['3.jpeg', '1.jpeg', '2.jpeg']
};
