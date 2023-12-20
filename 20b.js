const values = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

const devices = {};
let totalFlops = 0;
let totalFlopsOn = 0;

[...values.matchAll(/([%&])?(.+?) -> (.+)/g)].forEach(([, type, name, connections]) => {
    if (!devices[name]) devices[name] = {from: [], to: [], state: []};
    devices[name].type = type;
    if (type === '%') ++totalFlops;

    connections.split(', ').forEach(connectedTo => {
        devices[name].to.push(connectedTo);
        if (!devices[connectedTo]) devices[connectedTo] = {from: [], to: [], state: [], type: '-'};
        devices[connectedTo].from.push(name);
    })
})


const getButtonPresses = () => {
    let pulses = [];
    let reps = {};

    outer: for (let button = 1; ; ++button) {
        pulses = [{ to: 'broadcaster', from: 'button', type: false }];

        for (let i = pulses.length - 1; i < pulses.length; ++i) {
            const { from, to, type } = pulses[i];
            if (type && !reps[from] &&
                devices[devices.rx.from[0]].from.includes(from)) {
                reps[from] = button;
                if (Object.keys(reps).length === devices[devices.rx.from[0]].from.length) {
                    return Object.values(reps).reduce((acc, m) => acc * m, 1);
                }
            }

            const device = devices[to];

            switch (device.type) {
                case '%':
                    if (!type) {
                        device.state[0] = !device.state[0];
                        totalFlopsOn += device.state[0] ? 1 : -1;
                        device.to.forEach(sendTo => pulses.push({ to: sendTo, from: to, type: device.state[0] }));
                    }
                    break;
                case '&':
                    let sendType = false;
                    device.state[device.from.indexOf(from)] = type;
                    for (let j = 0; j < device.from.length; ++j) {
                        if (!device.state[j]) sendType = true;
                    }
                    device.to.forEach(sendTo => pulses.push({ to: sendTo, from: to, type: sendType, i }));
                    break;
                default:
                    device.to.forEach(
                        sendTo => pulses.push(
                            { to: sendTo, from: to, type: false }));
                    break;
            }
        }
    }
}

console.log(getButtonPresses());