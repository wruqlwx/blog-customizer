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

// Добавляем типизацию для пропсов
type ArticleParamsFormProps = {
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	// pendingState — это то, что мы нащелкали в форме, но еще не применили
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
		// Применяем выбранные настройки к статье
		setArticleState(pendingState);
		setIsOpen(false);
	};

	const handleReset = () => {
		// Сбрасываем и локальное состояние формы, и глобальное состояние статьи
		setPendingState(defaultArticleState);
		setArticleState(defaultArticleState);
		setIsOpen(false);
	};

	// Обработчики изменения полей теперь меняют только временное состояние (pendingState)
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
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
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
