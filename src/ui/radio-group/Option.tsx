import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';

import styles from './RadioGroup.module.scss';

type OptionProps = {
	value: string;
	title: string;
	selected: OptionType;
	groupName: string;
	onChange?: (option: OptionType) => void;
	option: OptionType;
};

export const Option = (props: OptionProps) => {
	const { value, title, selected, groupName, onChange, option } = props;

	const handleChange = () => onChange?.(option);

	const isChecked = value === selected.value;
	const inputId = `${groupName}_${value}`;
	const testId = `radio_radio_item_with_value__${value}`;

	return (
		<div className={styles.item} data-checked={isChecked}>
			<input
				className={styles.input}
				type='radio'
				name={groupName}
				id={inputId}
				value={value}
				checked={isChecked}
				onChange={handleChange}
			/>
			<label className={styles.label} htmlFor={inputId} data-testid={testId}>
				<Text size={18} uppercase>
					{title}
				</Text>
			</label>
		</div>
	);
};
