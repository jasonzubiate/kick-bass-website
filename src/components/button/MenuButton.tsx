'use client';

import { motion, cubicBezier } from 'framer-motion';

const buttonVariants = {
  open: {
    top: '16px',
    right: '16px',
  },
  closed: {
    top: 0,
    right: 0,
  },
};

const line1Variants = {
  open: {
    rotate: 45,
    width: '24px',
  },
  closed: {
    rotate: 0,
    top: 0,
    width: '24px',
  },
};

const line2Variants = {
  open: {
    rotate: -45,
    top: '-5px',
    width: '24px',
  },
  closed: {
    rotate: 0,
    top: 0,
    width: '24px',
  },
};

type MenuButtonProps = {
  isActive: boolean;
  setIsActive: (isMenuOpen: boolean) => void;
};

export default function MenuButton({ isActive, setIsActive }: MenuButtonProps) {
  return (
    <motion.button
      onClick={() => setIsActive(!isActive)}
      className="header__menu__btn z-[60]"
      variants={buttonVariants}
      animate={isActive ? 'open' : 'closed'}
      initial="closed"
      aria-label="Menu Button"
      transition={{ duration: 0.6, ease: cubicBezier(0.83, 0, 0.17, 1) }}
    >
      <motion.div
        className="header__menu__btn__line"
        variants={line1Variants}
        animate={isActive ? 'open' : 'closed'}
        initial="closed"
        transition={{ duration: 0.2, ease: cubicBezier(0.83, 0, 0.17, 1) }}
      />
      <motion.div
        className="header__menu__btn__line"
        variants={line2Variants}
        animate={isActive ? 'open' : 'closed'}
        initial="closed"
        transition={{ duration: 0.2, ease: cubicBezier(0.83, 0, 0.17, 1) }}
      />
    </motion.button>
  );
}
