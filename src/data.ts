export let flow:any = [
    {
      activityId: "Activity_1mtxna1",
      activityName: "人事-mumu1",
      activityType: "userTask",
      activityState: "REVIEW",
      activityStateName: "审批中",
      assignGroupType: "1",
      assignGroupName: "木木1",
      isSequential: null,
      sequentialName: null,
      assignDetailList: [
        {
          durationTime: "",
          createTime: "2022-09-27 11:05:53",
          endTime: null,
          assignee: "taskUser_117",
          assigneeName: "木木1",
          comment: null,
          activityState: "REVIEW",
          activityStateName: "审批中",
        },
      ],
    },
    {
      activityId: "Activity_1sz2piw",
      activityName: "发起人",
      activityType: "userTask",
      activityState: "AGREE",
      activityStateName: "已通过",
      assignGroupType: "5",
      assignGroupName: "发起人",
      isSequential: null,
      sequentialName: null,
      assignDetailList: [
        {
          durationTime: "",
          createTime: "2022-09-27 11:05:53",
          endTime: "2022-09-27 11:05:53",
          assignee: "taskUser_108",
          assigneeName: "任坤3",
          comment: "自动通过",
          activityState: "AGREE",
          activityStateName: "已通过",
        },
      ],
    },
    {
      activityId: "Event_0tkp8cz",
      activityName: "开始",
      activityType: "startEvent",
      activityState: "AGREE",
      activityStateName: "已通过",
      assignGroupType: null,
      assignGroupName: null,
      isSequential: null,
      sequentialName: null,
      assignDetailList: [
        {
          durationTime: "",
          createTime: "2022-09-27 11:05:53",
          endTime: "2022-09-27 11:05:53",
          assignee: null,
          assigneeName: null,
          comment: null,
          activityState: "AGREE",
          activityStateName: "已通过",
        },
      ],
    },
  ];
  
  
  export let xml:any = `
  <?xml version="1.0" encoding="UTF-8"?>
  <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:flowable="http://flowable.org/bpmn" id="diagram_Process_1664332422605" targetNamespace="http://flowable.org/bpmn">
    <bpmn2:process id="Process_1664332422605" name="业务流程_1664332422605" isExecutable="true" flowable:skipFirstNode="true" flowable:rollbackNode="Activity_1sz2piw" flowable:formKey="" flowable:formCategory="3">
      <bpmn2:documentation />
      <bpmn2:startEvent id="Event_0tkp8cz" name="开始">
        <bpmn2:extensionElements />
        <bpmn2:outgoing>Flow_1egdc5k</bpmn2:outgoing>
      </bpmn2:startEvent>
      <bpmn2:userTask id="Activity_1sz2piw" name="发起人">
        <bpmn2:extensionElements>
          <flowable:assignee type="5" value="applyUser" text="发起人" />
          <flowable:button prop="btn_pass" label="通过" display="true" />
          <flowable:button prop="btn_reject" label="驳回" display="true" />
          <flowable:button prop="btn_reject2" label="驳回" display="true" />
        </bpmn2:extensionElements>
        <bpmn2:incoming>Flow_1egdc5k</bpmn2:incoming>
      </bpmn2:userTask>
      <bpmn2:sequenceFlow id="Flow_1egdc5k" sourceRef="Event_0tkp8cz" targetRef="Activity_1sz2piw" />
    </bpmn2:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1664332422605">
        <bpmndi:BPMNEdge id="Flow_1egdc5k_di" bpmnElement="Flow_1egdc5k">
          <di:waypoint x="418" y="150" />
          <di:waypoint x="470" y="150" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNShape id="Event_0tkp8cz_di" bpmnElement="Event_0tkp8cz">
          <dc:Bounds x="382" y="132" width="36" height="36" />
          <bpmndi:BPMNLabel>
            <dc:Bounds x="389" y="175" width="23" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Activity_1sz2piw_di" bpmnElement="Activity_1sz2piw">
          <dc:Bounds x="470" y="110" width="100" height="80" />
        </bpmndi:BPMNShape>
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </bpmn2:definitions>
  `