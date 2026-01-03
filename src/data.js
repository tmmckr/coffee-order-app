// src/data.js

export const maschinenDaten = {
    "Kaffee": { stufen: true, ml_kaffee: [90, 120, 150, 180, 210, 220], cycles: true },
    "Café Crema": { stufen: true, ml_kaffee: [90, 120, 150, 180, 210, 220], cycles: true },
    "Latte Macchiato": { stufen: true, ml_kaffee: [20, 30, 40, 60, 80], ml_milch: [80, 140, 200, 270, 340], cycles: false },
    "Cappuccino": { stufen: true, ml_kaffee: [20, 30, 40, 60, 80], ml_milch: [90, 120, 150, 180, 210], cycles: false },
    "Americano": { stufen: true, ml_kaffee: [80, 100, 120, 160, 200], cycles: true },
    "Espresso Lungo": { stufen: true, ml_kaffee: [80, 100, 120, 160, 200], cycles: true },
    "Espresso": { stufen: true, ml_kaffee: [30, 40, 50], cycles: true },
    "Milchkaffee": { stufen: true, ml_kaffee: [50, 70, 90, 120, 150], ml_milch: [50, 70, 90, 120, 150], cycles: false },
    "Matcha": { stufen: false, ml_gesamt: [200, 250, 300, 350, 400, 450, 500], cycles: false },
    "Holy": { stufen: false, ml_gesamt: [300, 350, 400, 450, 500, 550, 600, 650, 700], cycles: false },
    "default": { stufen: false, cycles: false }
};

export const kaffeeSorten = [
    { name: "Kaffee", configKey: "Kaffee", strength: 3, desc: "Der zeitlose Klassiker." },
    { name: "Café Crema", configKey: "Café Crema", strength: 3, desc: "Langer Genuss mit Crema-Krone." },
    { name: "Espresso Lungo", configKey: "Espresso Lungo", strength: 4, desc: "Verlängertes Aromawunder." },
    { name: "Espresso", configKey: "Espresso", strength: 5, desc: "Der kleine Starke." },
    { name: "Latte Macchiato", configKey: "Latte Macchiato", strength: 2, desc: "Viel heiße Milch & Espresso mit Milchschaum." },
    { name: "Milchkaffee", configKey: "Milchkaffee", strength: 2, desc: "Halb Kaffee, halb Milch." },
    { name: "Cappuccino", configKey: "Cappuccino", strength: 3, desc: "Klassiker mit Milchschaumhaube." },
    { name: "Americano", configKey: "Americano", strength: 3, desc: "Espresso mit Wasser verlängert." },
    { name: "Iced Matcha Latte", configKey: "Matcha", strength: 0, desc: "Grüner Tee auf Eis & Milch." },
    { name: "Iced Protein Matcha", configKey: "Matcha", strength: 0, desc: "Matcha Latte mit Protein-Kick." },
    { name: "Holy Eistee", configKey: "Holy", strength: 0, desc: "Fruchtig & zuckerfrei. Der Energy-Kick." }, 
    { name: "Flat White", configKey: "default", strength: 4, desc: "Doppelter Ristretto mit Mikroschaum." },
    { name: "Iced Coffee", configKey: "default", strength: 3, desc: "Frisch gebrüht auf Eis." },
    { name: "Iced Latte", configKey: "default", strength: 2, desc: "Espresso auf kalter Milch & Eis." },
    { name: "Milchschaum", configKey: "default", strength: 0, desc: "Purer warmer Milchschaum." },
    { name: "Heißes Wasser", configKey: "default", strength: 0, desc: "Für Tee." },
    { name: "To-Go-Becher", configKey: "default", strength: 0, desc: "Für unterwegs." }
];