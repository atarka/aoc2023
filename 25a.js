const values = `jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`;

const devices = {};

values.split(/\n/).forEach((line) => {
    const [source, targets] = line.split(/: /);
    for (const target of targets.split(' ')) {
        if (!devices[source]) devices[source] = {label: source, nodes: []};
        if (!devices[target]) devices[target] = {label: target, nodes: []};
        devices[target].nodes.push(source);
        devices[source].nodes.push(target);
    }
});

const all = Object.keys(devices);

for (let l = 0; l < 1000000; ++l) { // going for label propagation
    const currentNode = devices[all[Math.floor(Math.random() * all.length)]];
    const labels = currentNode.nodes.reduce((acc, key) => (acc[devices[key].label] = (acc[devices[key].label] || 0) + 1, acc), {});
    const labelsSorted = Object.keys(labels).sort((a, b) => labels[b] - labels[a]);
    const labelsFiltered = labelsSorted.filter((label) => labels[label] === labels[labelsSorted[0]]);
    currentNode.label = labelsFiltered[Math.floor(Math.random() * labelsFiltered.length)];
}

const result = Object.values(
    Object.values(devices).reduce((acc, n) => (acc[n.label] = (acc[n.label] || 0) + 1, acc), {})
).reduce((acc, count) => acc * count, 1);

console.log(result);