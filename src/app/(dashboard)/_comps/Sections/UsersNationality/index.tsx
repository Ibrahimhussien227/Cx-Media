import { Card, CardBody, CardHeader } from "../../Card";
import Table from "./Table";
import { HeadCellCampaigns } from "./configs";
import { ITData } from "./type";

const UsersNationalitySection = (props: ITData) => {
  return (
    <Card className="lg:w-1/2 flex-grow">
      <CardHeader>
        <h2 className="font-bold">Users Nationality</h2>
      </CardHeader>
      <CardBody className="max-h-full h-80 flex-grow overflow-y-auto">
        <Table data={props.data} columns={HeadCellCampaigns} />
      </CardBody>
    </Card>
  );
};

export default UsersNationalitySection;
