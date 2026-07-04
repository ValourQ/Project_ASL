import { Info } from "lucide-react";
import styles from "../../styles/signToText/TipsCard.module.css";

function TipsCard() {

    return (

        <div className={styles.tipsCard}>

            <div className={styles.tipsIcon}>

                <Info size={22}/>

            </div>

            <div className={styles.tipsContent}>

                <h3>

                    Pro Tip

                </h3>

                <p>

                    Ensure good lighting and clear hand visibility for best results.
                    Avoid cluttered backgrounds and keep your hands within the camera frame.

                </p>

            </div>

        </div>

    );

}

export default TipsCard;