import styled from 'styled-components';

const Styles = {
  Wrapper: styled.div`
    svg {
      width: calc(68px * 3);
      height: calc(66px * 3);
    }
    /* ELEMENTS POSITIONS */
    #building_bottom,
    #window_01,
    #window_02,
    #door {
      transform: translateY(20px);
      z-index: 1;
    }
    #building_top,
    #balcony_01,
    #balcony_02,
    #balcony_03,
    #balcony_04,
    #balcony_05,
    #balcony_06 {
      transform: translateY(56px);
      z-index: -1;
    }
    #small_tree,
    #big_tree {
      transform: translateY(28px);
    }
    /* ELEMENTS ANIMATIONS */
    #building_bottom {
      animation: buildingBottom 1s ease-out forwards;
    }
    #window_01,
    #window_02,
    #door {
      animation: buildingBottom 1s 0.1s ease-in forwards;
    }
    #building_top {
      animation: buildingTop 1s 1.2s ease-out forwards;
    }
    #balcony_01,
    #balcony_02,
    #balcony_03 {
      animation: buildingTop 1s 1.4s ease-out forwards;
    }
    #balcony_04,
    #balcony_05,
    #balcony_06 {
      animation: buildingTop 1s 1.6s ease-out forwards;
    }
    #small_tree,
    #big_tree {
      animation: trees 1s 2s ease-out forwards;
    }
    #cloud_left {
      transform: translateX(-11px);
      animation: cloudLeft 20s 2s linear infinite;
    }
    #cloud_right {
      transform: translateX(72px);
      animation: cloudRight 15s 2s linear infinite;
    }
    /* ANIMATIONS */
    @keyframes buildingBottom {
      0% {
        transform: translateY(20px);
      }
      100% {
        transform: translateY(0);
      }
    }
    @keyframes buildingTop {
      0% {
        transform: translateY(56px);
      }
      100% {
        transform: translateY(0);
      }
    }
    @keyframes trees {
      0% {
        transform: translateY(28px);
      }
      100% {
        transform: translateY(0);
      }
    }
    @keyframes cloudLeft {
      0% {
        transform: translateX(-11px);
      }
      100% {
        transform: translateX(100px);
      }
    }
    @keyframes cloudRight {
      0% {
        transform: translateX(72px);
      }
      100% {
        transform: translateX(-100px);
      }
    }
  `,
};
export default Styles;
