import { google } from 'googleapis';

// Crea un cliente OAuth2 con el token de acceso
const oauth2Client = new google.auth.OAuth2();
oauth2Client.setCredentials({
  access_token: 'TOKEN_DE_ACCESO',
});



// Crea un objeto de evento
const event = {
    summary: 'Título del evento',
    start: {
      dateTime: '2023-06-12T10:00:00', // Fecha y hora de inicio del evento
      timeZone: 'America/New_York', // Zona horaria del evento
    },
    end: {
      dateTime: '2023-06-12T12:00:00', // Fecha y hora de finalización del evento
      timeZone: 'America/New_York', // Zona horaria del evento
    },
    location: 'Ubicación del evento',
    description: 'Descripción del evento',
  };
  
  // Crea una instancia del cliente de la API de Google Calendar
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
  // Llama al método events.insert para agregar el evento
  calendar.events.insert(
    {
      calendarId: 'primary', // ID del calendario donde se agregará el evento (puede ser 'primary' para el calendario principal del usuario)
      resource: event, // Objeto de evento que quieres agregar
    },
    (err, res) => {
      if (err) {
        console.log('Error al agregar el evento:', err);
        return;
      }
      console.log('Evento agregado:', res.data);
    }
  );
  