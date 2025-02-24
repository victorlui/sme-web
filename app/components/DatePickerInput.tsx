import React from "react";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";

import { getMonth, getYear } from "date-fns";
import _ from "lodash";

interface DatePickerInputProps {
  label?: string;
  dateFormat?: string;
  error?: string;
  date: Date | null;
  disabled?: boolean;
  setDate: (date: Date | null) => void;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  dateFormat = "dd/MM/yyyy",
  error = "",
  date,
  setDate,
  disabled = false,
}) => {
  const years = _.range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: ReactDatePickerCustomHeaderProps) => {
    return (
      <div className="flex items-center justify-between px-3 py-2 gap-3 ">
        <div className="flex flex-col items-start gap-1 w-full">
          <label className="text-[14px] font-semibold">Ano</label>
          <select
            className="p-2 rounded-md border bg-white border-gray-400 w-full"
            value={getYear(date)}
            onChange={({ target: { value } }: any) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <label className="text-[14px] font-semibold">Mês</label>
          <select
            className="p-2 rounded-md border bg-white border-gray-400 w-full"
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col  mb-3">
      {label && (
        <label className="font-semibold text-[16px] ml-1 mb-2 text-neutral-100">
          {label}
        </label>
      )}
      <DatePicker
        disabled={disabled}
        dateFormat={dateFormat}
        selected={date}
        onChange={(date) => setDate(date ?? null)}
        renderCustomHeader={renderCustomHeader}
        locale={ptBR}
        placeholderText={dateFormat}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        className="border cursor-pointer rounded-lg px-3 py-4 text-sm w-full outline-none border-neutral-500 text-neutral-300 placeholder:text-neutral-500 disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed"
      />
      {error && <p className="text-red-500 mt-1 ml-2 text-[14px]">{error}</p>}
    </div>
  );
};

export default DatePickerInput;
