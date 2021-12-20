const express = require('express');
const app = express();
app.use(express.json());

const horarios = [ 14, 15, 16, 17, 18 ];

app.get('/listadehorarios', ( request, response ) => {
    return response.json({ message: "Horários disponíveis:", horarios})
});

function disponivel( hora ) {
    return horarios.indexOf( Number( hora ) ) != -1;
}

app.get('/verificacao', ( request, response ) => {
    const { hora } = request.query;
    return response.json({ message: "Disponibilidade", disponivel: disponivel( hora ) })
});

app.post('/agendado', ( request, response ) => {
    const { hora } = request.body;
    const remover = horarios.indexOf( hora )
    if ( remover > -1 ) {
        horarios.splice( remover, 1 )
        return response.json({ message: "Agendado!"})
    } else {
        return response.json({ message: "Horário indisponível" })
    }
});

app.post('/desmarcado', ( request, response ) => {
    const { hora } = request. body;
    if ( !disponivel( hora )) {
        horarios.push( hora )
        return response.json({ message: "O horário escolhido foi desmarcado e agora está disponível para um novo agendamento." })
    } else {
        return response.json({ message: "O horário já está disponível para agendamento." })
    }
});

app.listen(3333 , () => { console.log('Backend funcionando') });