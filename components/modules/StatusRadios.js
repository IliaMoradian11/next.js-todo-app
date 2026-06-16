import { MdSettings, MdStart } from "react-icons/md";
import { TbMapSearch } from "react-icons/tb";
import { BiCheckDouble } from "react-icons/bi";

import { statusColors, statusTexts } from "@/constants/status";

import styles from "@/styles/modules/StatusRadios.module.css";

function StatusRadios({ handler, currentStatus, index, statusText }) {
  return (
    <button
      className={styles.status}
      onClick={() => handler(statusText)}
      style={{ backgroundColor: statusColors[index] }}
    >
      {index === 0 && <MdStart />}
      {index === 1 && <MdSettings />}
      {index === 2 && <TbMapSearch />}
      {index === 3 && <BiCheckDouble />}
      <span>{statusTexts[index]}</span>
      <input
        type="radio"
        name="status"
        checked={currentStatus === statusText}
        onChange={() => handler(statusText)}
      />
    </button>
  );
}

export default StatusRadios;
