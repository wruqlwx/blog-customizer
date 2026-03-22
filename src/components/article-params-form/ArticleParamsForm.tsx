import { useState, useRef, useEffect, FormEvent } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [pendingState, setPendingState] =
		useState<ArticleStateType>(defaultArticleState);

	const sidebarRef = useRef<HTMLElement>(null);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			sidebarRef.current &&
			!sidebarRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(pendingState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setPendingState(defaultArticleState);
		setArticleState(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={pendingState.fontFamilyOption}
						onChange={(option) =>
							setPendingState({ ...pendingState, fontFamilyOption: option })
						}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={pendingState.fontSizeOption}
						onChange={(option) =>
							setPendingState({ ...pendingState, fontSizeOption: option })
						}
					/>
					<Select
						title='Цвет текста'
						options={fontColors}
						selected={pendingState.fontColor}
						onChange={(option) =>
							setPendingState({ ...pendingState, fontColor: option })
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={pendingState.backgroundColor}
						onChange={(option) =>
							setPendingState({ ...pendingState, backgroundColor: option })
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={pendingState.contentWidth}
						onChange={(option) =>
							setPendingState({ ...pendingState, contentWidth: option })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' />
						<Button title='Применить' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
