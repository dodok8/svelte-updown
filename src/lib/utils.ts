import type { TierRange } from './types';

export function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

export const getExample = (): { x: Date; y: TierRange; id: number }[] => {
	const exampleData = [];
	let curr_date = new Date();
	let curr_tier: TierRange = 10;
	for (let idx = 0; idx < 20; idx++) {
		curr_date = new Date(curr_date.getTime() + getRandomInt(2, 45) * 60000);
		curr_tier += (-1) ** getRandomInt(0, 2);
		if (curr_tier < 0) {
			curr_tier = 0;
		}
		if (curr_tier > 29) {
			curr_tier = 29;
		}
		exampleData.push({
			x: curr_date,
			y: curr_tier as TierRange,
			id: getRandomInt(1, 32000)
		});
	}
	return exampleData;
};

export const convertNumTier = (value: TierRange) => {
	const color = ['B', 'S', 'G', 'P', 'D', 'R'][Math.floor(value / 5)];
	const num = Math.floor(value % 5) + 1;
	return color + num;
};
