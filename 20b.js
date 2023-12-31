const values = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

const devices = {};

[...values.matchAll(/([%&])?(.+?) -> (.+)/g)].forEach(([, type, name, connections]) => {
    if (!devices[name]) devices[name] = {from: [], to: [], state: []};
    devices[name].type = type;

    connections.split(', ').forEach(connectedTo => {
        devices[name].to.push(connectedTo);
        if (!devices[connectedTo]) devices[connectedTo] = {from: [], to: [], state: [], type: '-'};
        devices[connectedTo].from.push(name);
        devices[connectedTo].state.push(false);
    })
})


const getButtonPresses = (targetDevice) => {
    const reps = {};
    const target = devices[targetDevice];
    if (!target) return 0;

    for (let button = 1;; ++button) {
        const pulses = [{ to: 'broadcaster', from: 'button', type: false }];

        for (let i = 0; i < pulses.length; ++i) {
            const { from, to, type } = pulses[i];
            if (type && !reps[from] && devices[target.from[0]].from.includes(from)) {
                reps[from] = button;
                if (Object.keys(reps).length === devices[target.from[0]].from.length) {
                    return Object.values(reps).reduce((acc, m) => acc * m, 1);
                }
            }

            const device = devices[to];

            if (device.type === '%') {
                if (!type) {
                    device.state[0] = !device.state[0];
                    device.to.forEach(sendTo => pulses.push({ to: sendTo, from: to, type: device.state[0] }));
                }
            } else if (device.type === '&') {
                device.state[device.from.indexOf(from)] = type;
                const sendType = !device.state.every(Boolean);
                device.to.forEach(sendTo => pulses.push({ to: sendTo, from: to, type: sendType }));
            } else {
                device.to.forEach(sendTo => pulses.push({ to: sendTo, from: to, type: false }));
            }
        }
    }
}

console.log(getButtonPresses('rx'));