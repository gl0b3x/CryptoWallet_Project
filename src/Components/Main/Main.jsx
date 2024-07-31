import classes from "./Main.module.css";
import { ReactTyped } from "react-typed";
import { animated, useInView } from "react-spring";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";
import CreateAccountButton from "../CreateAccountButton/CreateAccountButton.jsx";

const Main = () => {
  const [ref, style] = useInView(() => ({
    from: {
      y: -100,
      opacity: 0,
    },
    to: {
      y: 0,
      opacity: 1,
    },
    config: { mass: 10, tension: 150, friction: 40 },
  }));

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = {
    fullScreen: {
      enable: false,
    },
    particles: {
      number: {
        value: 75,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: ["#8A2BE2", "#B89BE4", "#8128E2", "#AF6BF3"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.2,
      },
      size: {
        value: { min: 1, max: 3 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#8A2BE2",
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        outModes: "bounce",
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 150,
          links: {
            opacity: 0.5,
          },
        },
        push: {
          quantity: 1,
        },
      },
    },
  };

  return (
    <main className={classes.mainWrapper}>
      <Particles
        options={options}
        init={particlesInit}
        className={classes.particles}
      />
      <section className={classes.main}>
        <animated.section
          className={classes.leftSection}
          ref={ref}
          style={style}
        >
          <div className={classes.nameWallet}>
            <ReactTyped
              strings={["The Best", "The Faster", "The Most Convenient"]}
              typeSpeed={80}
              backSpeed={80}
              showCursor={true}
              loop
              className={classes.advantages}
            />
            <span className={classes.Article}>Crypto Wallet</span>
          </div>
          <span className={classes.aboutText}>
            <p>
              <span> NexGen </span>
              Wallet is not just a crypto wallet, it's a revolutionary crypto
              neo bank that aims to bring the same level of mass adoption as the
              dollar or euro.
            </p>
            <p>
              Buy, sell, store, swap and spend crypto all in one platform. Join
              us on our mission to make crypto adopted anywhere and everywhere!
            </p>
            <CreateAccountButton text={"Create Wallet"} speed={120} />
          </span>
        </animated.section>
        <section className={classes.rightSection}>
          <animated.img
            className={classes.photoCards}
            src="./cards.png"
            loading="lazy"
            alt="debit cards"
            ref={ref}
            style={style}
            draggable="false"
          />
        </section>
      </section>
    </main>
  );
};

export default Main;
