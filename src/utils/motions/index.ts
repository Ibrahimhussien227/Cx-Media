export const showSidebar = {
  width: "240px",
};

export const hideSidebar = {
  width: "80px",
};

export const showDropdown = {
  opacity: 1,
  display: "block",
  marginTop: "1rem",
  height: "100%",
};

export const hideDropdown = {
  display: "hidden",
  opacity: 0,
  height: "0px",
};

export const slideVariants = {
  hiddenRight: {
    x: "-100%",
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  },
  hiddenLeft: {
    x: "100%",
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  },
  visible: {
    x: "0",
    y: "0",
    opacity: 1,
    display: "block",

    transition: {
      duration: 1,
      // x: { duration: 1 },
      // repeat: Infinity,
      // repeatDelay: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ease: "circOut",
      duration: 0,
    },
  },
};
