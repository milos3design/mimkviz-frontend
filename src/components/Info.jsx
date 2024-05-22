import BackButton from "./BackButton";
import styles from "./Info.module.css";

function Info() {
  return (
    <div>
      <BackButton />
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <img src="/mimkvizlogo.png" alt="Mimkviz logo" />
          <p>
            Zaroni u nostalgičnu zabavu uz &ldquo;MimKviz&ldquo; - avanturu kroz
            svet legendarnih video klipova i mimova!
          </p>
          <p>
            Ova jedinstvena igra donosi ti 12 pitanja, sastavljena od
            nezaboravnih scena koje su obeležile internet i smešne momente iz
            Srbije i okoline. Očekuju te 6 lakših i 6 težih pitanja, a svako od
            njih zahteva poznavanje klasika internet humora. Sa samo 12 sekundi
            po pitanju, svaki igrač će biti izazvan da brzo reaguje i pokaže
            svoje poznavanje najzabavnijih trenutaka. Lakša pitanja nose 10
            poena, dok teža vrede 20 poena, vodeći te ka osvajanju maksimalnih
            180 poena!
          </p>
          <p>
            Da li si dovoljno spreman da se pridružiš elitnom društvu poznavaoca
            mimova i osvojiš svoje mesto u ekskluzivnoj top listi? Zabava i smeh
            su zagarantovani u &ldquo;MimKvizu&ldquo; - igri koja spaja
            nostalgiju, humor i izazov u jednoj neverovatnoj avanturi!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Info;
