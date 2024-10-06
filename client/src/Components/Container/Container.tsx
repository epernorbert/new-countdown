import classNames from "classnames";
import styles from "./Container.module.scss";
import { ReactElement } from "react";

type Props = React.PropsWithChildren<{
  className?: string;
}>;

const Container = ({ className, children }: Props) => {
  return <div className={classNames(styles.container, className)}>{children}</div>;
};

export default Container;
