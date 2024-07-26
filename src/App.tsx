import { useEffect, useState } from "react";

function App() {
  const [firstPrize, setFirstPrize] = useState(Number);
  const [twoDigit, setTwoDigit] = useState(Number);
  const [secondPrizeArr, setSecondPrizeArr] = useState<number[]>([]);
  const [prize, setPrize] = useState(Number);
  const [winning, setWining] = useState(false);
  const [resetInput, setResetInput] = useState(false);
  const randomPrize = () => {
    setSecondPrizeArr([]);
    firstRandom();
    secondRandom();
    twoDigitNumber();
  };
  const firstRandom = () => {
    const first = Math.floor(Math.random() * 1000);
    setFirstPrize(Number(first));
  };
  const secondRandom = () => {
    const prizeArr: number[] = [];
    while (prizeArr.length < 3) {
      const second = Math.floor(Math.random() * 1000);
      if (!prizeArr.includes(second) && second !== firstPrize) {
        prizeArr.push(second);
      }
    }
    setSecondPrizeArr(prizeArr);
  };
  const twoDigitNumber = () => {
    setTwoDigit(Math.floor(Math.random() * 100));
  };
  const checkPrize = () => {
    setWining(false);
    if (
      secondPrizeArr.includes(prize) ||
      firstPrize === prize ||
      twoDigit.toString() === prize.toString().slice(-2) ||
      firstPrize - 1 === prize ||
      firstPrize + 1 === prize
    ) {
      setWining(true);
    }
  };
  useEffect(() => {
    if (secondPrizeArr.includes(firstPrize)) {
      secondRandom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstPrize, secondPrizeArr]);
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <section className="w-5/12 max-w-lg min-w-80">
          <div className="flex flex-col justify-center items-center mb-10 gap-3">
            <p className="font-bold text-xl">Lottery by S.Ratchatrin :)</p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                randomPrize();
                setResetInput(false);
              }}
            >
              Start Random Number
            </button>
          </div>

          <div className="grid grid-cols-2 ">
            <div className="text-nowrap text-center">
              <p className="border-b-2 border-blue-600 bg-blue-600 text-white">
                1st prize
              </p>
              <p className="border-b-2 border-blue-600 bg-blue-600 text-white">
                Near the 1st Prize
              </p>
              <p className="border-b-2 border-blue-600 bg-blue-600 text-white">
                2nd prize
              </p>
              <p className="border-b-2 border-blue-600 bg-blue-600 text-white">
                last 2 digits
              </p>
            </div>
            {firstPrize === 0 ? (
              <>
                <div className="flex justify-center items-center">
                  <p>Click Random Button</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center font-bold bg-blue-400 text-white">
                  {firstPrize < 100 ? (
                    <>
                      <p className="border-b-2 border-blue-600 ">
                        {firstPrize.toString().padStart(3, "0")}
                      </p>
                      <div className="grid grid-cols-2">
                        <p className="border-b-2 border-blue-600 ">
                          {(firstPrize - 1).toString().padStart(3, "0")}
                        </p>
                        <p className="border-b-2 border-blue-600 ">
                          {(firstPrize + 1).toString().padStart(3, "0")}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="border-b-2 border-blue-600 ">
                        {firstPrize}
                      </p>
                      <div className="grid grid-cols-2">
                        <p className="border-b-2 border-blue-600 ">
                          {firstPrize - 1}
                        </p>
                        <p className="border-b-2 border-blue-600 ">
                          {firstPrize + 1}
                        </p>
                      </div>
                    </>
                  )}
                  <div className="grid grid-cols-3">
                    {secondPrizeArr.map((prize) => {
                      return (
                        <>
                          {prize < 100 ? (
                            <>
                              <p className="border-b-2 border-blue-600 ">
                                {prize.toString().padStart(3, "0")}
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="border-b-2 border-blue-600 ">
                                {prize}
                              </p>
                            </>
                          )}
                        </>
                      );
                    })}
                  </div>
                  {twoDigit < 10 ? (
                    <>
                      <p className="border-b-2 border-blue-600 ">
                        {twoDigit.toString().padStart(2, "0")}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="border-b-2 border-blue-600 ">{twoDigit}</p>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex mt-10 justify-center items-center flex-col gap-5">
            <div className="flex flex-col gap-5 justify-center items-center">
              <p className="font-bold text-xl">Check Prize</p>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs "
                onChange={(ev) => {
                  setPrize(Number(ev.target.value));
                  setResetInput(false);
                }}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  checkPrize();
                  setResetInput(true);
                }}
              >
                Check Prize
              </button>
            </div>
            {resetInput ? (
              <>
                {winning ? (
                  <>
                    <div
                      className="flex flex-col gap-3 p-2 justify-center w-9/12
                     items-center rounded-md bg-green-500 text-white "
                    >
                      <p>Congratulations!!! </p>
                      <div className="flex justify-center items-center gap-1 text-nowrap">
                        <p>You Winning</p>
                        {firstPrize === prize ? (
                          <>
                            <p>1st Prize</p>
                          </>
                        ) : (
                          <></>
                        )}
                        {firstPrize - 1 === prize ||
                        firstPrize + 1 === prize ? (
                          <>
                            <p>Near the 1st Prize</p>
                          </>
                        ) : (
                          <></>
                        )}
                        {secondPrizeArr.includes(prize) ? (
                          <>
                            <p>2nd Prize</p>
                          </>
                        ) : (
                          <></>
                        )}
                        {twoDigit.toString() === prize.toString().slice(-2) ? (
                          <>
                            <p>Last 2 digit Prize</p>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-3 p-2 justify-center w-9/12 items-center rounded-md bg-red-500 text-white ">
                      <p>Not Wining any Prize :(</p>
                    </div>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
