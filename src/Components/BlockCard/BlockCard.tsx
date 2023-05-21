import styles from "./BlockCard.module.css";

type BlockCardProps = {
  tittle: string;
  description: string;
  value: number;
  customClass?: string;
};

function BlockCard({
  tittle,
  description,
  value,
  customClass,
}: BlockCardProps) {
  return (
    <div className={`${styles.blockCard} ${styles[customClass || ""]}`}>
      <h1>{tittle}</h1>
      <p>
        {description}: <span>{value}</span>
      </p>
    </div>
  );
}

export default BlockCard;
