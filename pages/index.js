
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleReformulate = () => {
    if (!input.trim()) return;

    let simplified = input
      .replace(/(branchement|secteur|charge|redémarrage|affichage|npo|défaut|réparation|échange standard|garantie|acompte|diagnostic|nappe|batterie|écran|carte mère|modulaire|apple)/gi, "**$1**")
      .replace(/pas de video de charge/gi, "pas de **charge** détectée")
      .replace(/npo no power on/gi, "**pas d'allumage**")
      .replace(/inspection minutieuse visuelle/gi, "**inspection visuelle OK**")
      .replace(/proposition.*?échange standard/gi, "**proposition d'échange standard**")
      .replace(/délai.*?7 jours/gi, "**délai 7 jours ouvrés**")
      .replace(/garantie apple de 90 jours/gi, "**garantie Apple 90 jours**")
      .replace(/paiement en 4 échéances/gi, "**paiement en 4 fois**");

    // Limiter à 600 caractères maximum
    if (simplified.length > 600) {
      simplified = simplified.substring(0, 597) + "...";
    }

    setOutput(simplified);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Réformuler un Diagnostic Client</h1>
      <textarea
        placeholder="Collez ici votre diagnostic technique..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <button onClick={handleReformulate} style={{ padding: 10, backgroundColor: "black", color: "white" }}>
        Réformuler
      </button>
      {output && (
        <div style={{ marginTop: 20, backgroundColor: "#f0f0f0", padding: 15, borderRadius: 8 }}>
          <h2>Diagnostic Reformulé :</h2>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}
