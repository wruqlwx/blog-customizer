import { useState, useRef, useEffect, FormEvent } from 'react';
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

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [pendingState, setPendingState] =
		useState<ArticleStateType>(defaultArticleState);
	const sidebarRef = useRef<HTMLElement>(null);

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
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

	const applyStyles = (state: ArticleStateType) => {
		const root = document.documentElement;
		root.style.setProperty('--font-family', state.fontFamilyOption.value);
		root.style.setProperty('--font-size', state.fontSizeOption.value);
		root.style.setProperty('--font-color', state.fontColor.value);
		root.style.setProperty('--container-width', state.contentWidth.value);
		root.style.setProperty('--bg-color', state.backgroundColor.value);
	};

	useEffect(() => {
		applyStyles(defaultArticleState);
	}, []);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		applyStyles(pendingState);
		setIsOpen(false);
	};

	const handleReset = () => {
		const resetState = { ...defaultArticleState };
		setPendingState(resetState);
		applyStyles(resetState);
		setIsOpen(false);
	};

	const handleFontFamilyChange = (option: (typeof fontFamilyOptions)[0]) => {
		setPendingState({ ...pendingState, fontFamilyOption: option });
	};

	const handleFontColorChange = (option: (typeof fontColors)[0]) => {
		setPendingState({ ...pendingState, fontColor: option });
	};

	const handleBackgroundColorChange = (
		option: (typeof backgroundColors)[0]
	) => {
		setPendingState({ ...pendingState, backgroundColor: option });
	};

	const handleContentWidthChange = (option: (typeof contentWidthArr)[0]) => {
		setPendingState({ ...pendingState, contentWidth: option });
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[0]) => {
		setPendingState({ ...pendingState, fontSizeOption: option });
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				data-testid='sidebar'>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					data-testid='article-params-form'>
					<Text as='h2' size={31} weight={800} uppercase>
						Настройки
					</Text>
					<Separator />
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={pendingState.fontFamilyOption}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						name='fontColor'
						title='Цвет текста'
						options={fontColors}
						selected={pendingState.fontColor}
						onChange={handleFontColorChange}
					/>
					<RadioGroup
						name='backgroundColor'
						title='Цвет фона'
						options={backgroundColors}
						selected={pendingState.backgroundColor}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={pendingState.contentWidth}
						onChange={handleContentWidthChange}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={pendingState.fontSizeOption}
						onChange={handleFontSizeChange}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
