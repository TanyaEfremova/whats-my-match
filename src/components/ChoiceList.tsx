type Props = {
    choices: string[];
    onSelect: (choice: string) => void;
  };
  
  export default function ChoiceList({ choices, onSelect }: Props) {
    return (
      <div className="flex flex-col gap-2">
        {choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(choice)}
            className="w-full rounded-lg border border-gray-300 hover:border-gray-400 bg-white text-gray-800 hover:bg-gray-50 px-4 py-3 text-base font-medium transition-all"
          >
            {choice}
          </button>
        ))}
      </div>
    );
  }  