/**
 * paths.js — 사진 경로 상수
 *
 * 인물별 폴더명, 뱃지, 사진을 한곳에서 관리
 */

const PEOPLE_DIR = 'images/people';

const GROUP_FOLDER = '0-group';
const GROUP_PHOTOS = ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp', '8.webp', '9.webp', '11.webp', '12.webp', '13.webp', '14.webp', '15.webp', '16.webp', '17.webp', '18.webp', '19.webp', '20.webp', '21.webp', '22.gif', '23.webp', '24.webp', '25.webp', '26.webp', '27.webp', '28.webp', '29.webp', '30.webp', '31.webp', '32.webp', '33.webp', '34.webp', '35.webp'];

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
  jerry: ['badge-1.webp', 'badge-2.webp'],
  redshoes: ['badge-1.webp', 'badge-2.webp'],
  songhi: ['badge-1.webp', 'badge-2.webp'],
  gray: ['badge-1.webp', 'badge-2.webp'],
  seobuk: ['badge-2.webp', 'badge-3.webp'],
  hyo: ['badge-1.webp'],
  smaller: ['badge-1.webp', 'badge-2.webp'],
  danny: ['badge-1.webp', 'badge-2.webp'],
  iri: ['badge-1.webp', 'badge-2.webp'],
  dajeong: ['badge-1.webp', 'badge-2.webp'],
  choco: ['badge-1.webp', 'badge-2.webp']
};

// 활동 사진 (person.html 슬라이더용)
const PEOPLE_PHOTOS = {
  jerry: ['1.webp', '2.webp', '3.webp', '5.webp', '6.webp', '6.webp', '9.webp', '8.webp', '7.webp', '11.webp'],
  redshoes: ['1.webp', '2.webp', '3.webp', '5.webp', '6.webp', '7.webp', '7.webp'],
  songhi: ['14.webp', '2.webp', '3.webp', '4.webp', '13.webp', '6.webp', '7.webp', '9.webp', '10.webp', '11.webp', '12.webp'],
  gray: ['1.webp', '2.webp', '3.webp', '5.webp', '6.webp', '6.webp', '7.webp', '8.webp', '9.webp', '11.webp', '12.webp', '13.webp'],
  seobuk: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '8.webp', '10.webp'],
  hyo: ['1.webp', '3.webp', '4.webp', '5.webp'],
  smaller: ['1.webp', '2.webp', '3.webp', '5.webp', '6.webp', '6.webp', '7.webp', '8.webp', '9.webp'],
  danny: ['2.webp', '3.webp', '4.webp', '5.webp', '5.webp'],
  iri: ['1.webp', '2.webp'],
  dajeong: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp'],
  choco: ['3.webp', '1.webp', '2.webp']
};
