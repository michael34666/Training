import style from "./notFound.module.scss";

const PageNotFound = () => {
  return (
    <div className={style.notFound}>
      <h2>404 Error</h2>
      <p>The page does not exist.</p>
    </div>
  );
};

export default PageNotFound;
