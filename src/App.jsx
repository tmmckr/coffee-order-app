// src/App.jsx
import { useState } from 'react';
import { maschinenDaten, kaffeeSorten } from './data';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

// HIER DEIN NTFY TOPIC EINTRAGEN
const NTFY_TOPIC = "mamas-kaffee-123-geheim"; 

function App() {
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // State für die Konfiguration
  const [mlKaffee, setMlKaffee] = useState(null);
  const [mlMilch, setMlMilch] = useState(null);
  const [mlGesamt, setMlGesamt] = useState(null);

  const openConfig = (drink) => {
    setSelectedDrink(drink);
    const config = maschinenDaten[drink.configKey];
    
    // Default-Werte setzen (jeweils den ersten Wert im Array), falls vorhanden
    if (config?.ml_kaffee) setMlKaffee(config.ml_kaffee[0]);
    if (config?.ml_milch) setMlMilch(config.ml_milch[0]);
    if (config?.ml_gesamt) setMlGesamt(config.ml_gesamt[0]);
  };

  const closeConfig = () => {
    setSelectedDrink(null);
    setMlKaffee(null); setMlMilch(null); setMlGesamt(null);
  };

  const handleOrder = async () => {
    setLoading(true);
    const config = maschinenDaten[selectedDrink.configKey];
    
    // Bestelltext zusammenbauen
    let details = "";
    if (config.ml_kaffee) details += `Kaffee: ${mlKaffee}ml `;
    if (config.ml_milch) details += `Milch: ${mlMilch}ml `;
    if (config.ml_gesamt) details += `Gesamt: ${mlGesamt}ml`;
    if (!details) details = "Standardgröße";

    const orderData = {
      product: selectedDrink.name,
      details: details,
      timestamp: serverTimestamp(), // Firebase Serverzeit
      status: "neu"
    };

    try {
      // 1. In Firebase speichern (vorhandene Daten bleiben sicher, wir fügen nur hinzu)
      await addDoc(collection(db, "orders"), orderData);

      // 2. An dein Handy senden (ntfy)
      await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
        method: 'POST',
        body: `Neue Bestellung: ${selectedDrink.name}\n${details}`,
        headers: {
            'Title': '☕ Kaffeeservice',
            'Priority': 'high',
            'Tags': 'coffee,star'
        }
      });

      alert("Bestellung gesendet! ☕");
      closeConfig();

    } catch (error) {
      console.error("Fehler beim Bestellen:", error);
      alert("Fehler: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 bg-stone-900 text-stone-200 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-coffee-gold mb-2 tracking-wider">COFFEE BAR</h1>
        <p className="text-stone-400">Wähle deinen Genussmoment</p>
      </header>

      {/* Grid Layout für die Karten */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {kaffeeSorten.map((drink) => (
          <div 
            key={drink.name} 
            onClick={() => openConfig(drink)}
            className="bg-stone-800 p-5 rounded-xl border border-stone-700 shadow-lg hover:border-coffee-gold transition-all cursor-pointer active:scale-95"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-white">{drink.name}</h3>
              {/* Stärke-Anzeige als Punkte */}
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`h-2 w-2 rounded-full ${i < drink.strength ? 'bg-coffee-gold' : 'bg-stone-600'}`}></div>
                ))}
              </div>
            </div>
            <p className="text-sm text-stone-400">{drink.desc}</p>
          </div>
        ))}
      </div>

      {/* Konfigurations-Modal */}
      {selectedDrink && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-stone-800 p-6 rounded-2xl w-full max-w-md border border-stone-600 shadow-2xl relative">
            <button onClick={closeConfig} className="absolute top-4 right-4 text-stone-400 hover:text-white">✕</button>
            
            <h2 className="text-2xl font-bold text-coffee-gold mb-1">{selectedDrink.name}</h2>
            <p className="text-stone-400 text-sm mb-6">Konfiguriere dein Getränk</p>

            {/* Dynamische Auswahl basierend auf maschinenDaten */}
            <div className="space-y-6">
              
              {maschinenDaten[selectedDrink.configKey]?.ml_kaffee && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-stone-300">Kaffeemenge: <span className="text-coffee-gold">{mlKaffee} ml</span></label>
                  <input 
                    type="range" 
                    min="0" 
                    max={maschinenDaten[selectedDrink.configKey].ml_kaffee.length - 1} 
                    value={maschinenDaten[selectedDrink.configKey].ml_kaffee.indexOf(mlKaffee)}
                    onChange={(e) => setMlKaffee(maschinenDaten[selectedDrink.configKey].ml_kaffee[e.target.value])}
                    className="w-full h-2 bg-stone-600 rounded-lg appearance-none cursor-pointer accent-coffee-gold"
                  />
                  <div className="flex justify-between text-xs text-stone-500 mt-1">
                    <span>{maschinenDaten[selectedDrink.configKey].ml_kaffee[0]}ml</span>
                    <span>{maschinenDaten[selectedDrink.configKey].ml_kaffee.at(-1)}ml</span>
                  </div>
                </div>
              )}

              {maschinenDaten[selectedDrink.configKey]?.ml_milch && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-stone-300">Milchmenge: <span className="text-coffee-gold">{mlMilch} ml</span></label>
                  <input 
                    type="range" 
                    min="0" 
                    max={maschinenDaten[selectedDrink.configKey].ml_milch.length - 1} 
                    value={maschinenDaten[selectedDrink.configKey].ml_milch.indexOf(mlMilch)}
                    onChange={(e) => setMlMilch(maschinenDaten[selectedDrink.configKey].ml_milch[e.target.value])}
                    className="w-full h-2 bg-stone-600 rounded-lg appearance-none cursor-pointer accent-coffee-gold"
                  />
                </div>
              )}

              {maschinenDaten[selectedDrink.configKey]?.ml_gesamt && (
                 <div>
                 <label className="block text-sm font-medium mb-2 text-stone-300">Größe: <span className="text-coffee-gold">{mlGesamt} ml</span></label>
                 <div className="flex flex-wrap gap-2">
                   {maschinenDaten[selectedDrink.configKey].ml_gesamt.map((val) => (
                     <button 
                        key={val}
                        onClick={() => setMlGesamt(val)}
                        className={`px-3 py-1 rounded-full text-sm border transition-colors ${mlGesamt === val ? 'bg-coffee-gold border-coffee-gold text-black font-bold' : 'border-stone-600 text-stone-400 hover:border-stone-400'}`}
                     >
                       {val}
                     </button>
                   ))}
                 </div>
               </div>
              )}
            </div>

            <button 
              onClick={handleOrder} 
              disabled={loading}
              className="mt-8 w-full bg-coffee-gold hover:bg-amber-600 text-black font-bold py-3 rounded-lg transition-colors flex justify-center items-center"
            >
              {loading ? "Wird gesendet..." : "Kostenpflichtig bestellen"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;