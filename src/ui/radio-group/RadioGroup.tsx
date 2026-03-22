import { Option } from './Option';
import { Text } from 'src/ui/text';
import { OptionType } from 'src/constants/articleProps';

import styles from './RadioGroup.module.scss';

type RadioGroupProps = {
	name: string;
	options: OptionType[];
	selected: OptionType;
	onChange?: (option: OptionType) => void;
	title: string;
};

export const RadioGroup = ({
	name,
	options,
	selected,
	onChange,
	title,
}: RadioGroupProps) => {
	return (
		<div className={styles.container}>
			{title && (
				<Text weight={800} size={12} uppercase>
					{title}
				</Text>
			)}
			<div className={styles.group}>
				{options.map((option) => (
					<Option
						key={option.value}
						groupName={name}
						value={option.value}
						title={option.title}
						selected={selected}
						onChange={onChange}
						option={option}
					/>
				))}
			</div>
		</div>
	);
};
