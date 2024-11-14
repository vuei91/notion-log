const Search = () => {
  return (
    <div className="box-border flex w-full max-w-[654px] gap-[8px] rounded-[20px] bg-[#F7F9FC] p-[12px_24px]">
      <SearchIcon />
      <input
        type="text"
        className="w-full border-none bg-[#F7F9FC] focus:outline-none"
        placeholder="검색어를 입력해 주세요."
      />
    </div>
  );
};

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M10.5 17C14.0899 17 17 14.0899 17 10.5C17 6.91015 14.0899 4 10.5 4C6.91015 4 4 6.91015 4 10.5C4 14.0899 6.91015 17 10.5 17Z"
        stroke="#111111"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L19.2929 20.7071ZM14.2929 15.7071L19.2929 20.7071L20.7071 19.2929L15.7071 14.2929L14.2929 15.7071Z"
        fill="#111111"
      />
    </svg>
  );
};

export default Search;
