
export const cursos = [
  // ======================= INGLÉS =======================
  {
    id: "ingles",
    nombre: "Inglés desde Español",
    lang: "en",
    unidades: [
      {
        numero: 1,
        titulo: "Introducción y saludos",
        premium: false,
        lecciones: [
          {
            numero: 1,
            titulo: "Frases Básicas",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente frase:", texto: "Hello!", lang: "en", audio: "repaso-ingles-1.mp3",
                respuesta: ["Hola"], extras: ["Adiós", "Gracias", "Chau"]
              },
              {
                consigna: "Traduce la siguiente frase:", texto: "Please.", lang: "en", audio: "repaso-ingles-2.mp3",
                respuesta: ["Por", "favor"], extras: ["De", "nada", "Gracias"]
              },
              {
                consigna: "Traduce la siguiente frase:", texto: "Thank you.", lang: "en", audio: "repaso-ingles-3.mp3",
                respuesta: ["Gracias"], extras: ["Hola", "Por", "favor"]
              },
              {
                consigna: "Traduce la siguiente frase:", texto: "You're welcome.", lang: "en", audio: "repaso-ingles-4.mp3",
                respuesta: ["De", "nada"], extras: ["Gracias", "Por", "favor"]
              },
              {
                consigna: "Traduce la siguiente frase:", texto: "Goodbye!", lang: "en", audio: "repaso-ingles-5.mp3",
                respuesta: ["Adiós"], extras: ["Hola", "Gracias", "Bienvenido"]
              }
            ]
          },
          {
            numero: 2,
            titulo: "Presentaciones",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente oración:", texto: "Good morning! How are you?", lang: "en", audio: "leccion-de-ingles-1.mp3",
                respuesta: ["Buenos", "días", "¿Cómo", "estás?"], extras: ["Hola", "Gracias", "Adiós"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "What is your name?", lang: "en", audio: "leccion-de-ingles-2.mp3",
                respuesta: ["¿Cuál", "es", "tu", "nombre?"], extras: ["Mi", "año", "saludo"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "My name is Ana", lang: "en", audio: "leccion-de-ingles-3.mp3",
                respuesta: ["Mi", "nombre", "es", "Ana"], extras: ["Gimena", "edad", "Su"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Nice to meet you.", lang: "en", audio: "leccion-de-ingles-4.mp3",
                respuesta: ["Mucho", "gusto", "en", "conocerte"], extras: ["Hola", "gracias", "Adiós"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "I am from Argentina", lang: "en", audio: "leccion-de-ingles-5.mp3",
                respuesta: ["Soy", "de", "Argentina"], extras: ["Francia", "donde", "El"]
              }
            ]
          },
          {
            numero: 3,
            titulo: "Vocabulario de Familia",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Mother", lang: "en",
                respuesta: ["Madre"], extras: ["Padre", "Hermana", "Abuela"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "My brother is tall", lang: "en",
                respuesta: ["Mi", "hermano", "es", "alto"], extras: ["hermana", "bajo", "Tu"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Tengo dos hermanas", lang: "es",
                respuesta: ["I", "have", "two", "sisters"], extras: ["brothers", "three", "has"]
              }
            ]
          }
        ]
      },
      {
        numero: 2,
        titulo: "Comida",
        premium: false,
        lecciones: [
          {
            numero: 1,
            titulo: "Frutas y Verduras",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Carrot", lang: "en", audio: "ingles-U2-L1-FyV-1.mp3",
                respuesta: ["Zanahoria"], extras: ["Manzana", "Remolacha", "Sandía"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Me encanta el helado", lang: "es", audio: "ingles-U2-L1-FyV-2.mp3",
                respuesta: ["I", "love", "ice cream"], extras: ["like", "pizza", "don't"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Are you a vegetarian?", lang: "en", audio: "ingles-U2-L1-FyV-3.mp3",
                respuesta: ["¿Eres", "vegetariana?"], extras: ["vegetal", "manzana", "vegano"]
              },
              {
                consigna: "Traduce la siguiente palabra:", texto: "Spaghetti", lang: "en", audio: "ingles-U2-L1-FyV-4.mp3",
                respuesta: ["Espagueti"], extras: ["Pizza", "Pancho", "Sopa", "Pescado"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Martin is cooking soup", lang: "en", audio: "ingles-U2-L1-FyV-5.mp3",
                respuesta: ["Martín", "está", "cocinando", "sopa"], extras: ["estaba", "no", "pizza"]
              }
            ]
          },
          {
            numero: 2,
            titulo: "En el Restaurante",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Water", lang: "en",
                respuesta: ["Agua"], extras: ["Vino", "Jugo", "Leche"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "The menu, please", lang: "en",
                respuesta: ["La", "carta,", "por", "favor"], extras: ["cuenta", "gracias", "el"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "La cuenta, por favor", lang: "es",
                respuesta: ["The", "bill,", "please"], extras: ["menu", "water", "thanks"]
              }
            ]
          },
          {
            numero: 3,
            titulo: "Bebidas y Postre",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Coffee", lang: "en",
                respuesta: ["Café"], extras: ["Té", "Leche", "Jugo"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Do you want tea?", lang: "en",
                respuesta: ["¿Quieres", "té?"], extras: ["café", "leche", "Quiero"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Quiero un pastel", lang: "es",
                respuesta: ["I", "want", "a", "cake"], extras: ["juice", "tea", "have"]
              }
            ]
          }
        ]
      },
      {
        numero: 3,
        titulo: "Viajes",
        premium: true,
        lecciones: [
          {
            numero: 1,
            titulo: "En el Aeropuerto",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Passport", lang: "en",
                respuesta: ["Pasaporte"], extras: ["Boleto", "Valija", "Avión"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Where is the gate?", lang: "en",
                respuesta: ["¿Dónde", "está", "la", "puerta?"], extras: ["el", "avión", "Cuándo"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Mi vuelo está retrasado", lang: "es",
                respuesta: ["My", "flight", "is", "delayed"], extras: ["late", "plane", "are"]
              }
            ]
          },
          {
            numero: 2,
            titulo: "Reservar un Hotel",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Room", lang: "en",
                respuesta: ["Habitación"], extras: ["Cama", "Llave", "Baño"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "I have a reservation", lang: "en",
                respuesta: ["Tengo", "una", "reserva"], extras: ["habitación", "dos", "Tienes"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Una habitación para dos", lang: "es",
                respuesta: ["A", "room", "for", "two"], extras: ["bed", "three", "key"]
              }
            ]
          },
          {
            numero: 3,
            titulo: "Pedir Direcciones",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Left", lang: "en",
                respuesta: ["Izquierda"], extras: ["Derecha", "Recto", "Cerca"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Turn right", lang: "en",
                respuesta: ["Gira", "a", "la", "derecha"], extras: ["izquierda", "el", "Sigue"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "¿Dónde está el museo?", lang: "es",
                respuesta: ["Where", "is", "the", "museum?"], extras: ["hotel?", "are", "station?"]
              }
            ]
          }
        ]
      }
    ]
  },

  // ======================= ALEMÁN =======================
  {
    id: "aleman",
    nombre: "Alemán desde Español",
    lang: "de",
    unidades: [
      {
        numero: 1,
        titulo: "Introducción y saludos",
        premium: false,
        lecciones: [
          {
            numero: 1,
            titulo: "Frases Básicas",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente frase:", texto: "Hallo!", lang: "de", audio: "repaso-aleman-1.mp3",
                respuesta: ["Hola"], extras: ["Adiós", "Gracias", "Chau"]
              },
              {
                consigna: "Traduce la siguiente frase:", texto: "Bitte.", lang: "de", audio: "repaso-aleman-2.mp3",
                respuesta: ["Por", "favor"], extras: ["De", "nada", "Gracias"]
              },
              {
                consigna: "Traduce la siguiente frase:", texto: "Danke.", lang: "de", audio: "repaso-aleman-3.mp3",
                respuesta: ["Gracias"], extras: ["Hola", "Por", "favor"]
              },
              {
                consigna: "Traduce la siguiente frase:", texto: "Gern geschehen.", lang: "de", audio: "repaso-aleman-4.mp3",
                respuesta: ["De", "nada"], extras: ["Gracias", "Por", "favor"]
              },
              {
                consigna: "Traduce la siguiente frase:", texto: "Tschüss!", lang: "de", audio: "repaso-aleman-5.mp3",
                respuesta: ["Adiós"], extras: ["Hola", "Gracias", "Bienvenido"]
              }
            ]
          },
          {
            numero: 2,
            titulo: "Presentaciones",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente oración:", texto: "Hallo, guten Tag! Wie geht es dir?", lang: "de", audio: "leccion-de-aleman-1.mp3",
                respuesta: ["Buenos", "días", "¿Cómo", "estás?"], extras: ["Hola", "Gracias", "Adiós"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Wie ist dein Name?", lang: "de", audio: "leccion-de-aleman-2.mp3",
                respuesta: ["¿Cuál", "es", "tu", "nombre?"], extras: ["Mi", "año", "saludo"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Mein Name ist Ana.", lang: "de", audio: "leccion-de-aleman-3.mp3",
                respuesta: ["Mi", "nombre", "es", "Ana"], extras: ["Gimena", "edad", "Su"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Freut mich, dich kennenzulernen.", lang: "de", audio: "leccion-de-aleman-4.mp3",
                respuesta: ["Mucho", "gusto", "en", "conocerte"], extras: ["Hola", "gracias", "Adiós"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Ich bin aus Argentinien", lang: "de", audio: "leccion-de-aleman-5.mp3",
                respuesta: ["Soy", "de", "Argentina"], extras: ["Francia", "donde", "El"]
              }
            ]
          },
          {
            numero: 3,
            titulo: "Vocabulario de Familia",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Mutter", lang: "de",
                respuesta: ["Madre"], extras: ["Padre", "Hermana", "Abuela"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Mein Bruder ist groß", lang: "de",
                respuesta: ["Mi", "hermano", "es", "alto"], extras: ["hermana", "bajo", "Tu"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Tengo dos hermanas", lang: "es",
                respuesta: ["Ich", "habe", "zwei", "Schwestern"], extras: ["Brüder", "drei", "hat"]
              }
            ]
          }
        ]
      },
      {
        numero: 2,
        titulo: "Comida",
        premium: false,
        lecciones: [
          {
            numero: 1,
            titulo: "Frutas y Verduras",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Zanahoria", lang: "es", audio: "aleman-U2-L1-FyV-1.mp3",
                respuesta: ["Karotte"], extras: ["Apfel", "Wassermelone", "Kopfsalat"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Me encanta el helado", lang: "es", audio: "aleman-U2-L1-FyV-2.mp3",
                respuesta: ["Ich", "liebe", "Eiscreme"], extras: ["Nein", "Tschüss", "Eins"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Sind Sie Vegetarier?", lang: "de", audio: "aleman-U2-L1-FyV-3.mp3",
                respuesta: ["¿Eres", "vegetariano?"], extras: ["vegetal", "manzana", "vegano"]
              },
              {
                consigna: "Traduce la siguiente palabra:", texto: "Espagueti", lang: "es", audio: "aleman-U2-L1-FyV-4.mp3",
                respuesta: ["Spaghetti"], extras: ["Pizza", "Hamburger", "Kopfsalat", "Fleisch"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Martín está cocinando sopa", lang: "es", audio: "aleman-U2-L1-FyV-5.mp3",
                respuesta: ["Martin", "kocht", "Suppe"], extras: ["Apfel", "Wassermelone", "Kopfsalat"]
              }
            ]
          },
          {
            numero: 2,
            titulo: "En el Restaurante",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Wasser", lang: "de",
                respuesta: ["Agua"], extras: ["Vino", "Jugo", "Leche"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Die Speisekarte, bitte", lang: "de",
                respuesta: ["La", "carta,", "por", "favor"], extras: ["cuenta", "gracias", "el"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "La cuenta, por favor", lang: "es",
                respuesta: ["Die", "Rechnung,", "bitte"], extras: ["Speisekarte", "Wasser", "danke"]
              }
            ]
          },
          {
            numero: 3,
            titulo: "Bebidas y Postre",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Kaffee", lang: "de",
                respuesta: ["Café"], extras: ["Té", "Leche", "Jugo"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Möchtest du Tee?", lang: "de",
                respuesta: ["¿Quieres", "té?"], extras: ["café", "leche", "Quiero"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Quiero un pastel", lang: "es",
                respuesta: ["Ich", "möchte", "einen", "Kuchen"], extras: ["Tee", "Saft", "habe"]
              }
            ]
          }
        ]
      },
      {
        numero: 3,
        titulo: "Viajes",
        premium: true,
        lecciones: [
          {
            numero: 1,
            titulo: "En el Aeropuerto",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Reisepass", lang: "de",
                respuesta: ["Pasaporte"], extras: ["Boleto", "Valija", "Avión"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Wo ist das Gate?", lang: "de",
                respuesta: ["¿Dónde", "está", "la", "puerta?"], extras: ["el", "avión", "Cuándo"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Mi vuelo está retrasado", lang: "es",
                respuesta: ["Mein", "Flug", "hat", "Verspätung"], extras: ["Flugzeug", "ist", "pünktlich"]
              }
            ]
          },
          {
            numero: 2,
            titulo: "Reservar un Hotel",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Zimmer", lang: "de",
                respuesta: ["Habitación"], extras: ["Cama", "Llave", "Baño"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Ich habe eine Reservierung", lang: "de",
                respuesta: ["Tengo", "una", "reserva"], extras: ["habitación", "dos", "Tienes"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Una habitación para dos", lang: "es",
                respuesta: ["Ein", "Zimmer", "für", "zwei"], extras: ["Bett", "drei", "Schlüssel"]
              }
            ]
          },
          {
            numero: 3,
            titulo: "Pedir Direcciones",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Links", lang: "de",
                respuesta: ["Izquierda"], extras: ["Derecha", "Recto", "Cerca"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "Biegen Sie rechts ab", lang: "de",
                respuesta: ["Gira", "a", "la", "derecha"], extras: ["izquierda", "el", "Sigue"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "¿Dónde está el museo?", lang: "es",
                respuesta: ["Wo", "ist", "das", "Museum?"], extras: ["Hotel?", "sind", "Bahnhof?"]
              }
            ]
          }
        ]
      }
    ]
  },

  // ======================= CHINO =======================
  {
    id: "chino",
    nombre: "Chino desde Español",
    lang: "zh",
    unidades: [
      {
        numero: 1,
        titulo: "Introducción y saludos",
        premium: false,
        lecciones: [
          {
            numero: 1,
            titulo: "Frases Básicas",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente frase:", texto: "你好！", lang: "zh",
                respuesta: ["Hola"], extras: ["Adiós", "Gracias", "Chau"]
              },
              {
                consigna: "Traduce la siguiente frase:", texto: "请。", lang: "zh",
                respuesta: ["Por", "favor"], extras: ["De", "nada", "Gracias"]
              },
              {
                consigna: "Traduce la siguiente frase:", texto: "谢谢。", lang: "zh",
                respuesta: ["Gracias"], extras: ["Hola", "Por", "favor"]
              },
              {
                consigna: "Traduce la siguiente frase:", texto: "不客气。", lang: "zh",
                respuesta: ["De", "nada"], extras: ["Gracias", "Por", "favor"]
              },
              {
                consigna: "Traduce la siguiente frase:", texto: "再见！", lang: "zh",
                respuesta: ["Adiós"], extras: ["Hola", "Gracias", "Bienvenido"]
              }
            ]
          },
          {
            numero: 2,
            titulo: "Presentaciones",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente oración:", texto: "你好，早上好，你好吗？", lang: "zh", audio: "leccion-de-chino-1.mp3",
                respuesta: ["Buenos", "días", "¿Cómo", "estás?"], extras: ["Hola", "Gracias", "Adiós"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "你叫什么名字？", lang: "zh", audio: "leccion-de-chino-2.mp3",
                respuesta: ["¿Cuál", "es", "tu", "nombre?"], extras: ["Mi", "año", "saludo"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "我的名字是安娜。", lang: "zh", audio: "leccion-de-chino-3.mp3",
                respuesta: ["Mi", "nombre", "es", "Ana"], extras: ["Gimena", "edad", "Su"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "很高兴认识你", lang: "zh", audio: "leccion-de-chino-4.mp3",
                respuesta: ["Mucho", "gusto", "en", "conocerte"], extras: ["Hola", "gracias", "Adiós"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "我来自阿根廷", lang: "zh", audio: "leccion-de-chino-5.mp3",
                respuesta: ["Soy", "de", "Argentina"], extras: ["Francia", "donde", "El"]
              }
            ]
          },
          {
            numero: 3,
            titulo: "Vocabulario de Familia",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "妈妈", lang: "zh",
                respuesta: ["Mamá"], extras: ["Papá", "Hermana", "Abuela"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "我的哥哥很高", lang: "zh",
                respuesta: ["Mi", "hermano", "es", "alto"], extras: ["hermana", "bajo", "Tu"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "我有两个姐姐", lang: "zh",
                respuesta: ["Tengo", "dos", "hermanas"], extras: ["hermanos", "tres", "Tiene"]
              }
            ]
          }
        ]
      },
      {
        numero: 2,
        titulo: "Comida",
        premium: false,
        lecciones: [
          {
            numero: 1,
            titulo: "Frutas y Verduras",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "Zanahoria", lang: "es", audio: "chino-U2-L1-FyV-1.mp3",
                respuesta: ["紅蘿蔔"], extras: ["蘋果", "披薩", "西瓜"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "我喜歡冰淇淋", lang: "zh", audio: "chino-U2-L1-FyV-2.mp3",
                respuesta: ["Me", "encanta", "el", "helado"], extras: ["ellos", "pizza", "no"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "你是素食主義者嗎？", lang: "zh", audio: "chino-U2-L1-FyV-3.mp3",
                respuesta: ["¿Eres", "vegetariano?"], extras: ["vegano", "ellos", "carne"]
              },
              {
                consigna: "Traduce la siguiente palabra:", texto: "義大利細麵條", lang: "zh", audio: "chino-U2-L1-FyV-4.mp3",
                respuesta: ["Espagueti"], extras: ["Pizza", "Pancho", "Carne", "Ensalada"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "馬丁正在煮湯", lang: "zh", audio: "chino-U2-L1-FyV-5.mp3",
                respuesta: ["Martín", "está", "cocinando", "sopa"], extras: ["no", "estaba", "pizza"]
              }
            ]
          },
          {
            numero: 2,
            titulo: "En el Restaurante",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "水", lang: "zh",
                respuesta: ["Agua"], extras: ["Vino", "Jugo", "Leche"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "请给我菜单", lang: "zh",
                respuesta: ["Por", "favor,", "dame", "el", "menú"], extras: ["cuenta", "agua", "gracias"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "买单", lang: "zh",
                respuesta: ["La", "cuenta"], extras: ["carta", "sopa", "El"]
              }
            ]
          },
          {
            numero: 3,
            titulo: "Bebidas y Postre",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "咖啡", lang: "zh",
                respuesta: ["Café"], extras: ["Té", "Leche", "Jugo"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "你要茶吗？", lang: "zh",
                respuesta: ["¿Quieres", "té?"], extras: ["café", "leche", "Quiero"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "我想要蛋糕", lang: "zh",
                respuesta: ["Quiero", "un", "pastel"], extras: ["jugo", "té", "Tengo"]
              }
            ]
          }
        ]
      },
      {
        numero: 3,
        titulo: "Viajes",
        premium: true,
        lecciones: [
          {
            numero: 1,
            titulo: "En el Aeropuerto",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "护照", lang: "zh",
                respuesta: ["Pasaporte"], extras: ["Boleto", "Valija", "Avión"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "登机口在哪里？", lang: "zh",
                respuesta: ["¿Dónde", "está", "la", "puerta?"], extras: ["el", "avión", "Cuándo"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "我的航班晚点了", lang: "zh",
                respuesta: ["Mi", "vuelo", "está", "retrasado"], extras: ["avión", "temprano", "es"]
              }
            ]
          },
          {
            numero: 2,
            titulo: "Reservar un Hotel",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "房间", lang: "zh",
                respuesta: ["Habitación"], extras: ["Cama", "Llave", "Baño"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "我有预订", lang: "zh",
                respuesta: ["Tengo", "una", "reserva"], extras: ["habitación", "dos", "Tienes"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "两个人的房间", lang: "zh",
                respuesta: ["Una", "habitación", "para", "dos"], extras: ["cama", "tres", "llave"]
              }
            ]
          },
          {
            numero: 3,
            titulo: "Pedir Direcciones",
            tipo: "ejercicios",
            ejercicios: [
              {
                consigna: "Traduce la siguiente palabra:", texto: "左边", lang: "zh",
                respuesta: ["Izquierda"], extras: ["Derecha", "Recto", "Cerca"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "向右转", lang: "zh",
                respuesta: ["Gira", "a", "la", "derecha"], extras: ["izquierda", "el", "Sigue"]
              },
              {
                consigna: "Traduce la siguiente oración:", texto: "博物馆在哪里？", lang: "zh",
                respuesta: ["¿Dónde", "está", "el", "museo?"], extras: ["hotel?", "la", "Cuándo"]
              }
            ]
          }
        ]
      }
    ]
  }
];