import styles from "./BlockCard.module.css";

type BlockCardProps = {
  title: string;
  description: string;
  value: number;
  customClass?: string;
};

function BlockCard({ title, description, value, customClass }: BlockCardProps) {
  return (
    <div className={`${styles.blockCard} ${styles[customClass || ""]}`}>
      <h1>{title}</h1>
      <p>
        {description}: <span>{value}</span>
      </p>
    </div>
  );
}

export default BlockCard;
