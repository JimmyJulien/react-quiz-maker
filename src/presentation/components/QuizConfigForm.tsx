import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  QuizCategoryModel,
  QuizConfigModel,
  QuizDifficultyModel,
} from "../../domain/models/quiz.models";
import { UiForm, UiFormField } from "../ui/UiForm";

type QuizConfigFormProps = {
  categories: QuizCategoryModel[];
  difficulties: QuizDifficultyModel[];
  disabled?: boolean;
  initialCategory?: string;
  initialDifficulty?: string;
  onSubmit?: (quizConfig: QuizConfigModel) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const QuizConfigFormSchema = z.object({
  categoryId: z.string(),
  difficultyId: z.string(),
});

type QuizConfigFormModel = z.infer<typeof QuizConfigFormSchema>;

export default function QuizConfigForm({
  categories,
  difficulties,
  disabled = false,
  initialCategory = "",
  initialDifficulty = "",
  onSubmit,
}: QuizConfigFormProps) {
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<QuizConfigFormModel>({
    values: {
      categoryId: initialCategory,
      difficultyId: initialDifficulty,
    },
  });

  function onFormSubmit(quizConfig: QuizConfigFormModel) {
    if (!disabled && onSubmit) {
      const category: QuizCategoryModel = categories.find(
        (category) => category.value === quizConfig.categoryId,
      )!;

      const difficulty: QuizDifficultyModel = difficulties.find(
        (difficulty) => difficulty.value === quizConfig.difficultyId,
      )!;

      onSubmit({ category, difficulty });
    }
  }

  return (
    <UiForm onSubmit={handleSubmit(onFormSubmit)}>
      <UiFormField>
        <label htmlFor="categorySelect">Category</label>
        <select
          disabled={disabled}
          id="categorySelect"
          {...register("categoryId")}
        >
          <option value={""}>Select a category</option>
          {categories.map((category) => (
            <option key={category.label} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </UiFormField>
      <UiFormField>
        <label htmlFor="difficultySelect">Difficulty</label>
        <select
          disabled={disabled}
          id="difficultySelect"
          {...register("difficultyId")}
        >
          <option value={""}>Select a difficulty</option>
          {difficulties.map((difficulty) => (
            <option key={difficulty.label} value={difficulty.value}>
              {difficulty.label}
            </option>
          ))}
        </select>
      </UiFormField>
      <button disabled={disabled || !isValid} id="createBtn">
        Create
      </button>
    </UiForm>
  );
}
