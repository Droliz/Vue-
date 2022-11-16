import axios from "axios";
import { IData } from "../type/index";

class InitData implements IData {
  china: any[] = [];
  hbData: any = {};
  type: number = 0;
  mapType: number = 0;
  lineType: number = 0;
  lastUpdateTime: string = "";
  areaTree: any[] = [];
  chinaDayList: any[] = [];
  chinaTotal: any = [];
}

const getData = async (data: InitData) => {
  const res = await axios("/ug/api/wuhan/app/data/list-total");
  const dataList = res.data.data;
  data.areaTree = dataList.areaTree;
  data.chinaDayList = dataList.chinaDayList;
  data.chinaTotal = dataList.chinaTotal;
  data.china = dataList.areaTree.find(
    (v: { id: string }) => v.id === "0"
  ).children;
  data.hbData = data.china.find((v) => v.id === "420000");
};

export { InitData, getData };
