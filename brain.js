// bimsillah

console.log('BISMILLAH !')
console.log(process.argv)
const brain = require('brainjs')

// const network = new brain.recurrent.LSTM();
for(key in brain) {
	console.log(key)
}
const net = new brain.NeuralNetwork()

// net.train([
// 	{input: ["автомат","игил","сирия"], output: [1]},
// 	{input: ["автомат","игил","сирия"], output: [1]},
// 	{input: ["автомат","игил","сирия"], output: [1]},
// 	{input: ["талиб","игил","сирия"], output: [1]},
// 	{input: ["автомат","игил","сирия"], output: [1]},
// 	{input: ["автомат","игил","винтовка"], output: [1]},
// 	{input: ["автомат","игил","сирия"], output: [1]},
// 	{input: ["автомат","талибан","сирия"], output: [1]},
// 	{input: ["толиб","игил","сирия"], output: [1]},
// 	{input: ["автомат","игил","сирия"], output: [1]},
// 	{input: ["автомат","игил","сирия"], output: [1]},
// 	{input: ["наркота","игил","сирия"], output: [1]},
// 	{input: ["автомат","игил","сирия"], output: [1]},
// 	{input: ["автомат","игил","афганистан"], output: [1]},
// 	{input: ["автомат","игил","сирия"], output: [1]},

// 	])
net.train([
	{input: [0,1], output: [1]},
	{input: [1,0], output: [1]},
	{input: [0,0], output: [0]},
	{input: [1,1], output: [0]},

])
const output = net.run([0,1])
console.log(output)
module.exports.check_anti_terror = (words) => {
	var output = net.run(words)
	return output
}

