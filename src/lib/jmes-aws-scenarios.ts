export type AwsScenario = {
  slug: string;
  title: string;
  icon: string;
  command: string;
  json: string;
  expression: string;
  explanation: string;
  csvPreview: { headers: string[]; rows: string[][] };
};

export const AWS_SCENARIOS: AwsScenario[] = [
  {
    slug: "ec2",
    title: "EC2 instance inventory",
    icon: "🖥️",
    command: "aws ec2 describe-instances --region us-east-1",
    json: `{
  "Reservations": [
    {
      "ReservationId": "r-0123abcd",
      "Instances": [
        {
          "InstanceId": "i-0abc1234def567890",
          "InstanceType": "t3.micro",
          "LaunchTime": "2024-12-05T14:03:21+00:00",
          "PrivateIpAddress": "10.0.1.12",
          "State": { "Name": "running" },
          "Tags": [
            { "Key": "Name", "Value": "app-server-1" },
            { "Key": "Env", "Value": "prod" }
          ]
        },
        {
          "InstanceId": "i-0ffedcba987654321",
          "InstanceType": "m6g.large",
          "LaunchTime": "2024-11-01T09:14:10+00:00",
          "PrivateIpAddress": "10.0.2.7",
          "State": { "Name": "stopped" },
          "Tags": [
            { "Key": "Name", "Value": "batch-worker" },
            { "Key": "Env", "Value": "staging" }
          ]
        }
      ]
    }
  ]
}`,
    expression:
      "Reservations[].Instances[].{InstanceId: InstanceId, Type: InstanceType, State: State.Name, LaunchTime: LaunchTime, PrivateIP: PrivateIpAddress}",
    explanation:
      "Flattens Reservations and Instances, then projects only the columns needed for reporting.",
    csvPreview: {
      headers: ["InstanceId", "Type", "State", "LaunchTime", "PrivateIP"],
      rows: [
        ["i-0abc1234def567890", "t3.micro", "running", "2024-12-05T14:03:21+00:00", "10.0.1.12"],
        ["i-0ffedcba987654321", "m6g.large", "stopped", "2024-11-01T09:14:10+00:00", "10.0.2.7"],
      ],
    },
  },
  {
    slug: "s3",
    title: "S3 bucket list",
    icon: "🪣",
    command: "aws s3api list-buckets",
    json: `{
  "Buckets": [
    { "Name": "data-lake-prod", "CreationDate": "2023-08-15T12:00:00.000Z" },
    { "Name": "cdn-assets", "CreationDate": "2022-04-03T09:22:10.000Z" },
    { "Name": "backup-logs", "CreationDate": "2024-01-19T18:44:29.000Z" }
  ],
  "Owner": { "DisplayName": "example-account", "ID": "123456789012" }
}`,
    expression: "Buckets[].{Name: Name, CreationDate: CreationDate}",
    explanation: "Lists bucket names with creation dates. Region can be joined from a separate call.",
    csvPreview: {
      headers: ["Name", "CreationDate"],
      rows: [
        ["data-lake-prod", "2023-08-15T12:00:00.000Z"],
        ["cdn-assets", "2022-04-03T09:22:10.000Z"],
        ["backup-logs", "2024-01-19T18:44:29.000Z"],
      ],
    },
  },
  {
    slug: "lambda",
    title: "Lambda functions",
    icon: "λ",
    command: "aws lambda list-functions --region us-west-2",
    json: `{
  "Functions": [
    {
      "FunctionName": "image-resize",
      "Runtime": "python3.11",
      "MemorySize": 512,
      "Timeout": 15,
      "LastModified": "2024-12-10T08:11:54.123+0000"
    },
    {
      "FunctionName": "webhook-handler",
      "Runtime": "nodejs20.x",
      "MemorySize": 256,
      "Timeout": 10,
      "LastModified": "2024-11-28T17:01:02.987+0000"
    }
  ]
}`,
    expression:
      "Functions[].{FunctionName: FunctionName, Runtime: Runtime, MemoryMB: MemorySize, TimeoutSec: Timeout, LastModified: LastModified}",
    explanation: "Creates a concise inventory ready for operations reviews.",
    csvPreview: {
      headers: ["FunctionName", "Runtime", "MemoryMB", "TimeoutSec", "LastModified"],
      rows: [
        ["image-resize", "python3.11", "512", "15", "2024-12-10T08:11:54.123+0000"],
        ["webhook-handler", "nodejs20.x", "256", "10", "2024-11-28T17:01:02.987+0000"],
      ],
    },
  },
  {
    slug: "iam-users",
    title: "IAM users",
    icon: "👤",
    command: "aws iam list-users",
    json: `{
  "Users": [
    {
      "UserName": "alice",
      "CreateDate": "2022-07-12T10:05:33Z",
      "PasswordLastUsed": "2024-12-14T06:20:01Z"
    },
    {
      "UserName": "bob",
      "CreateDate": "2023-02-03T18:40:11Z",
      "PasswordLastUsed": null
    }
  ]
}`,
    expression: "Users[].{UserName: UserName, CreateDate: CreateDate, PasswordLastUsed: PasswordLastUsed}",
    explanation: "Highlights account age and password usage for security audits.",
    csvPreview: {
      headers: ["UserName", "CreateDate", "PasswordLastUsed"],
      rows: [
        ["alice", "2022-07-12T10:05:33Z", "2024-12-14T06:20:01Z"],
        ["bob", "2023-02-03T18:40:11Z", ""],
      ],
    },
  },
  {
    slug: "rds",
    title: "RDS instances",
    icon: "🗄️",
    command: "aws rds describe-db-instances --region us-east-1",
    json: `{
  "DBInstances": [
    {
      "DBInstanceIdentifier": "orders-db",
      "DBInstanceClass": "db.r6g.large",
      "Engine": "aurora-postgresql",
      "DBInstanceStatus": "available",
      "AllocatedStorage": 100
    },
    {
      "DBInstanceIdentifier": "analytics-db",
      "DBInstanceClass": "db.r6g.2xlarge",
      "Engine": "aurora-mysql",
      "DBInstanceStatus": "modifying",
      "AllocatedStorage": 500
    }
  ]
}`,
    expression:
      "DBInstances[].{DBInstanceIdentifier: DBInstanceIdentifier, Engine: Engine, Status: DBInstanceStatus, Class: DBInstanceClass, AllocatedStorage: AllocatedStorage}",
    explanation: "Summarizes database fleet status and sizes for capacity tracking.",
    csvPreview: {
      headers: ["DBInstanceIdentifier", "Engine", "Status", "Class", "AllocatedStorage"],
      rows: [
        ["orders-db", "aurora-postgresql", "available", "db.r6g.large", "100"],
        ["analytics-db", "aurora-mysql", "modifying", "db.r6g.2xlarge", "500"],
      ],
    },
  },
  {
    slug: "cloudformation",
    title: "CloudFormation stacks",
    icon: "🧱",
    command: "aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE",
    json: `{
  "StackSummaries": [
    {
      "StackName": "networking",
      "CreationTime": "2023-06-01T12:00:00Z",
      "StackStatus": "CREATE_COMPLETE"
    },
    {
      "StackName": "payments",
      "CreationTime": "2024-02-10T08:30:00Z",
      "StackStatus": "UPDATE_COMPLETE"
    }
  ]
}`,
    expression: "StackSummaries[].{StackName: StackName, Status: StackStatus, CreationTime: CreationTime}",
    explanation: "Produces a clean list of stacks and their states for governance.",
    csvPreview: {
      headers: ["StackName", "Status", "CreationTime"],
      rows: [
        ["networking", "CREATE_COMPLETE", "2023-06-01T12:00:00Z"],
        ["payments", "UPDATE_COMPLETE", "2024-02-10T08:30:00Z"],
      ],
    },
  },
  {
    slug: "ecs",
    title: "ECS tasks",
    icon: "📦",
    command: "aws ecs list-tasks --cluster prod-cluster && aws ecs describe-tasks --cluster prod-cluster --tasks <ids>",
    json: `{
  "tasks": [
    {
      "taskArn": "arn:aws:ecs:us-east-1:123456789012:task/prod-cluster/1111",
      "lastStatus": "RUNNING",
      "clusterArn": "arn:aws:ecs:us-east-1:123456789012:cluster/prod-cluster"
    },
    {
      "taskArn": "arn:aws:ecs:us-east-1:123456789012:task/prod-cluster/2222",
      "lastStatus": "PENDING",
      "clusterArn": "arn:aws:ecs:us-east-1:123456789012:cluster/prod-cluster"
    }
  ]
}`,
    expression: "tasks[].{TaskArn: taskArn, ClusterArn: clusterArn, LastStatus: lastStatus}",
    explanation: "Extracts the essentials for task health dashboards.",
    csvPreview: {
      headers: ["TaskArn", "ClusterArn", "LastStatus"],
      rows: [
        [
          "arn:aws:ecs:us-east-1:123456789012:task/prod-cluster/1111",
          "arn:aws:ecs:us-east-1:123456789012:cluster/prod-cluster",
          "RUNNING",
        ],
        [
          "arn:aws:ecs:us-east-1:123456789012:task/prod-cluster/2222",
          "arn:aws:ecs:us-east-1:123456789012:cluster/prod-cluster",
          "PENDING",
        ],
      ],
    },
  },
  {
    slug: "vpc",
    title: "VPC list",
    icon: "🌐",
    command: "aws ec2 describe-vpcs",
    json: `{
  "Vpcs": [
    {
      "VpcId": "vpc-0abc1234",
      "CidrBlock": "10.0.0.0/16",
      "State": "available",
      "Tags": [{ "Key": "Name", "Value": "core" }]
    },
    {
      "VpcId": "vpc-0def5678",
      "CidrBlock": "172.31.0.0/16",
      "State": "available",
      "Tags": [{ "Key": "Name", "Value": "shared-services" }]
    }
  ]
}`,
    expression: "Vpcs[].{VpcId: VpcId, CidrBlock: CidrBlock, State: State, Name: Tags[?Key=='Name'].Value | [0]}",
    explanation: "Adds tag-based names to the VPC list to make reports readable.",
    csvPreview: {
      headers: ["VpcId", "CidrBlock", "State", "Name"],
      rows: [
        ["vpc-0abc1234", "10.0.0.0/16", "available", "core"],
        ["vpc-0def5678", "172.31.0.0/16", "available", "shared-services"],
      ],
    },
  },
  {
    slug: "security-groups",
    title: "Security groups",
    icon: "🛡️",
    command: "aws ec2 describe-security-groups --region us-west-2",
    json: `{
  "SecurityGroups": [
    {
      "GroupId": "sg-0123abcd",
      "GroupName": "web-frontend",
      "VpcId": "vpc-0abc1234",
      "IpPermissions": [
        {
          "IpProtocol": "tcp",
          "FromPort": 443,
          "ToPort": 443,
          "IpRanges": [{ "CidrIp": "0.0.0.0/0" }]
        }
      ]
    },
    {
      "GroupId": "sg-0fedcba9",
      "GroupName": "db",
      "VpcId": "vpc-0abc1234",
      "IpPermissions": [
        {
          "IpProtocol": "tcp",
          "FromPort": 5432,
          "ToPort": 5432,
          "IpRanges": [{ "CidrIp": "10.0.0.0/16" }]
        }
      ]
    }
  ]
}`,
    expression:
      "SecurityGroups[].{GroupId: GroupId, GroupName: GroupName, VpcId: VpcId, InboundRules: IpPermissions[].{Protocol: IpProtocol, FromPort: FromPort, ToPort: ToPort, Source: IpRanges[].CidrIp | [0]}}",
    explanation: "Surfaces inbound rules in a compact structure to scan open access quickly.",
    csvPreview: {
      headers: ["GroupId", "GroupName", "VpcId", "InboundRules"],
      rows: [
        [
          "sg-0123abcd",
          "web-frontend",
          "vpc-0abc1234",
          '[{"Protocol":"tcp","FromPort":443,"ToPort":443,"Source":"0.0.0.0/0"}]',
        ],
        [
          "sg-0fedcba9",
          "db",
          "vpc-0abc1234",
          '[{"Protocol":"tcp","FromPort":5432,"ToPort":5432,"Source":"10.0.0.0/16"}]',
        ],
      ],
    },
  },
  {
    slug: "cloudwatch-alarms",
    title: "CloudWatch alarms",
    icon: "⏰",
    command: "aws cloudwatch describe-alarms --state-value ALARM",
    json: `{
  "MetricAlarms": [
    {
      "AlarmName": "HighCPU",
      "StateValue": "ALARM",
      "MetricName": "CPUUtilization",
      "Namespace": "AWS/EC2"
    },
    {
      "AlarmName": "5xxErrors",
      "StateValue": "ALARM",
      "MetricName": "5XXError",
      "Namespace": "AWS/ApplicationELB"
    }
  ]
}`,
    expression: "MetricAlarms[].{AlarmName: AlarmName, StateValue: StateValue, MetricName: MetricName, Namespace: Namespace}",
    explanation: "Creates an actionable list of active alarms for on-call handoffs.",
    csvPreview: {
      headers: ["AlarmName", "StateValue", "MetricName", "Namespace"],
      rows: [
        ["HighCPU", "ALARM", "CPUUtilization", "AWS/EC2"],
        ["5xxErrors", "ALARM", "5XXError", "AWS/ApplicationELB"],
      ],
    },
  },
];
