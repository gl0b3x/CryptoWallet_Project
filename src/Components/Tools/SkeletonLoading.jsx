import classes from "./Tools.module.css";

const SkeletonLoading = ({ style }) => {
  return <div className={classes.skeleton} style={style} />;
};

export default SkeletonLoading;
