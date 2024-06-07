interface Stats {
  totalCount: number;
  activecount: number;
  invitedcount: number;
  trashedcount: number;
}

export const filterStates = (stats?: Stats) => {
  return [
    {
      title: "Total Administrators",
      icon: "Users",
      value: stats?.totalCount.toString(),
    },
    {
      title: "Active",
      icon: "CheckCircle",
      value: stats?.activecount.toString(),
    },
    {
      title: "Invited",
      icon: "WarningCircle",
      value: stats?.invitedcount.toString(),
    },
    {
      title: "Blocked",
      icon: "Prohibit",
      value: stats?.trashedcount.toString(),
    },
  ];
};
