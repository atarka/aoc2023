const values = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`;

const { draw } = require('./utils');

const [workflowsData] = values.split(/\n{2}/);

const workFlows = {};
for (const data of workflowsData.split(/\n/)) {
    const [, name, rules] = data.match(/(.+?)\{(.+)}/);
    workFlows[name] = rules.split(/,/).map(
        r => r.match(/((.)(.)(\d+):)?(.+)/)).map(([,, param, operator, value, workFlow]) => ({param, operator, value: value * 1, workFlow})
    );
}

const acceptedRanges = [];

const dissectRange = (item) => {
    const {flow} = item;
    if (flow === 'R') return;
    if (flow === 'A') return acceptedRanges.push(item);

    const flowRules = workFlows[flow];
    for (const {param, operator, value, workFlow} of flowRules) {
        switch (operator) {
            case '<':
                if (item[param][0] >= value) break;
                else if (item[param][1] < value) queue.push({...item, flow: workFlow});
                else {
                    queue.push({...item, flow: workFlow, [param]: [item[param][0], value - 1]});
                    queue.push({...item, [param]: [value, item[param][1]]});
                }
                return;

            case '>':
                if (item[param][1] <= value) break;
                else if (item[param][0] > value) queue.push({...item, flow: workFlow});
                else {
                    queue.push({...item, [param]: [item[param][0], value]});
                    queue.push({...item, flow: workFlow, [param]: [value + 1, item[param][1]]});
                }
                return;
            case '=':
                if (item[param][0] > value || item[param][1] < value) break;
                else {
                    queue.push({...item, flow: workFlow, [param]: [value, value]});
                    if (value !== item[param][0]) queue.push({...item, [param]: [item[param][1], value - 1]});
                    if (value !== item[param][1]) queue.push({...item, [param]: [value + 1, item[param][1]]});
                }
                return;

            default:
                queue.push({...item, flow: workFlow})
                return;
        }
    }
}

const queue = [{x: [1, 4000], a: [1, 4000], s: [1, 4000], m: [1, 4000], flow: 'in'}];
while (queue.length) dissectRange(queue.shift());
const total = acceptedRanges.reduce((sum, range) => sum + ['x', 'a', 's', 'm'].reduce((mul, param) => mul * (range[param][1] - range[param][0] + 1), 1), 0);
console.log(total);