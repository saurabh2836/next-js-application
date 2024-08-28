import React from "react";

interface QuestionProps {
  _id: number;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionsCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="sm:flex-now flex flex-col-reverse items-start justify-between gap-5">
        <div>
          <span>{String(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionsCard;
