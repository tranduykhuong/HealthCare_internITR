export const handleDataSnapshotDetail = ({ data, duration }) => {
  const dataI = [];
  const dataII = [];
  const dataIII = [];
  const size = duration * 250;

  if (data && data?.dataECG) {
    for (let i = 0; i < size; i += 1) {
      dataI.push({ x: i, y: (data?.dataECG[2][i] - 3) * 4 });
      dataII.push({ x: i, y: (data?.dataECG[1][i]) * 4 });
      dataIII.push({ x: i, y: (data?.dataECG[0][i] + 3) * 4 });
    }
  }

  return {
    dataI,
    dataII,
    dataIII,
  };
};

export const handleTagsGroupSelected = () => {

};
