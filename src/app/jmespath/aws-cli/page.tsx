/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "AWS CLI JMESPath Guide | Filters, Examples, and CSV Export",
  description:
    "Learn AWS CLI JMESPath with practical examples for EC2, S3, Lambda, IAM, RDS, CloudFormation, and more. Ready-to-use queries plus CSV export tips.",
  canonicalPath: "/jmespath/aws-cli",
});

const faqItems = [
  {
    q: "Do I need a $ prefix in AWS CLI JMESPath?",
    a: "No. JMESPath expressions in AWS CLI start directly with keys, e.g., Reservations[].Instances[].InstanceId.",
  },
  {
    q: "How do I sort AWS CLI results?",
    a: "Use sort_by(collection, &key). Example: sort_by(Reservations[].Instances[], &LaunchTime)[].InstanceId.",
  },
  {
    q: "Can I join strings in JMESPath?",
    a: "Yes. Use join to combine values, e.g., join('-', [InstanceId, State.Name]).",
  },
  {
    q: "How do I handle missing fields?",
    a: "Use default values or filters, e.g., {Name: Tags[?Key=='Name'].Value | [0] || 'n/a'}.",
  },
  {
    q: "Is this compatible with --output table?",
    a: "JMESPath works regardless of the final renderer. For CSV, keep --output json and use this converter for clean exports.",
  },
  {
    q: "Can I chain expressions?",
    a: "Yes. Use pipes like Reservations[].Instances[] | [?State.Name=='running'] | [].InstanceId.",
  },
];

const quickStarts = [
  {
    title: "First item",
    command: "aws ec2 describe-instances --query Reservations[0].Instances[0]",
  },
  {
    title: "Filter running",
    command:
      "aws ec2 describe-instances --query \"Reservations[].Instances[?State.Name=='running'].[InstanceId,InstanceType]\" --output table",
  },
  {
    title: "Count",
    command:
      "aws s3api list-buckets --query \"length(Buckets)\"",
  },
  {
    title: "Projection",
    command:
      "aws lambda list-functions --query \"Functions[].{Name:FunctionName,Runtime:Runtime}\"",
  },
];

const serviceSections = [
  {
    service: "EC2",
    examples: [
      {
        desc: "Instance IDs and states",
        query:
          "--query \"Reservations[].Instances[].{Id:InstanceId,State:State.Name,Type:InstanceType}\"",
      },
      {
        desc: "Filter running in a VPC",
        query:
          "--query \"Reservations[].Instances[?State.Name=='running' && VpcId=='vpc-123'].InstanceId\"",
      },
      {
        desc: "Latest launch time",
        query:
          "--query \"max_by(Reservations[].Instances[], &LaunchTime).LaunchTime\"",
      },
    ],
  },
  {
    service: "S3",
    examples: [
      {
        desc: "Bucket names",
        query: "--query \"Buckets[].Name\"",
      },
      {
        desc: "Creation dates",
        query: "--query \"Buckets[].{Name:Name,Created:CreationDate}\"",
      },
      {
        desc: "Count buckets",
        query: "--query \"length(Buckets)\"",
      },
    ],
  },
  {
    service: "Lambda",
    examples: [
      {
        desc: "Runtime inventory",
        query:
          "--query \"Functions[].{Name:FunctionName,Runtime:Runtime,Memory:MemorySize}\"",
      },
      {
        desc: "Filter by runtime",
        query:
          "--query \"Functions[?Runtime=='python3.11'].FunctionName\"",
      },
      {
        desc: "Sort by last modified",
        query:
          "--query \"sort_by(Functions, &LastModified)[].FunctionName\"",
      },
    ],
  },
  {
    service: "IAM",
    examples: [
      {
        desc: "User report",
        query: "--query \"Users[].{User:UserName,Created:CreateDate}\"",
      },
      {
        desc: "Users without password",
        query: "--query \"Users[?PasswordLastUsed==null].UserName\"",
      },
      {
        desc: "Count users",
        query: "--query \"length(Users)\"",
      },
    ],
  },
  {
    service: "RDS",
    examples: [
      {
        desc: "DB inventory",
        query:
          "--query \"DBInstances[].{Id:DBInstanceIdentifier,Engine:Engine,Status:DBInstanceStatus}\"",
      },
      {
        desc: "Filter PostgreSQL",
        query: "--query \"DBInstances[?Engine=='aurora-postgresql'].DBInstanceIdentifier\"",
      },
      {
        desc: "Storage overview",
        query: "--query \"DBInstances[].{Id:DBInstanceIdentifier,Storage:AllocatedStorage}\"",
      },
    ],
  },
  {
    service: "CloudFormation",
    examples: [
      {
        desc: "Stacks summary",
        query: "--query \"StackSummaries[].{Name:StackName,Status:StackStatus}\"",
      },
      {
        desc: "Filter failed stacks",
        query:
          "--query \"StackSummaries[?contains(StackStatus, 'FAILED')].StackName\"",
      },
      {
        desc: "Latest stack",
        query: "--query \"max_by(StackSummaries, &CreationTime).StackName\"",
      },
    ],
  },
  {
    service: "CloudWatch",
    examples: [
      {
        desc: "Alarms in ALARM state",
        query:
          "--query \"MetricAlarms[?StateValue=='ALARM'].{Name:AlarmName,Metric:MetricName}\"",
      },
      {
        desc: "Namespaces used",
        query: "--query \"MetricAlarms[].Namespace | unique(@)\"",
      },
      {
        desc: "Count alarms",
        query: "--query \"length(MetricAlarms)\"",
      },
    ],
  },
  {
    service: "VPC",
    examples: [
      {
        desc: "VPC overview",
        query: "--query \"Vpcs[].{VpcId:VpcId,Cidr:CidrBlock,State:State}\"",
      },
      {
        desc: "VPC names via tags",
        query: "--query \"Vpcs[].{VpcId:VpcId,Name:Tags[?Key=='Name'].Value|[0]}\"",
      },
      {
        desc: "Count subnets",
        query:
          "--query \"length(Subnets)\"",
      },
    ],
  },
];

export default function AwsCliPage() {
  const pageUrl = `${SITE.url}/jmespath/aws-cli`;
  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "AWS CLI JMESPath Guide",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["aws cli jmespath", "jmespath aws", "jmespath query"],
        })}
      />

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          AWS CLI JMESPath Guide
        </h1>
        <p className="max-w-3xl text-lg text-black/70 dark:text-white/70">
          Learn how to shape AWS CLI JSON output with JMESPath. Copy-paste patterns for EC2, S3, Lambda, IAM, RDS, CloudFormation, CloudWatch, and more—plus direct links to test online and export CSV.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="/jmespath"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Try online
          </Link>
          <Link
            href="/jmespath/create-csv"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            JMESPath create CSV
          </Link>
        </div>
      </header>

      <section className="mt-8 grid gap-3 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Quick start</h2>
        <p className="text-sm text-black/70 dark:text-white/70">
          Drop these into your terminal with --query. They work with aws --output json or --output table.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {quickStarts.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-black/10 bg-white/70 p-3 text-sm dark:border-white/10 dark:bg-black/30"
            >
              <p className="font-semibold text-black dark:text-white">{item.title}</p>
              <code className="mt-1 block rounded-md bg-black/5 px-2 py-1 font-mono text-xs text-black dark:bg-white/10 dark:text-white break-words whitespace-pre-wrap">
                {item.command}
              </code>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 rounded-2xl border border-black/10 bg-white/50 p-6 dark:border-white/10 dark:bg-black/20">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black dark:text-white">Service patterns</h2>
          <Link
            href="/jmespath"
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-300"
          >
            Try in playground →
          </Link>
        </div>
        <div className="grid gap-4">
          {serviceSections.map((section) => (
            <div key={section.service} className="rounded-xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-black/25">
              <h3 className="text-lg font-semibold text-black dark:text-white">{section.service}</h3>
              <div className="mt-2 grid gap-2 md:grid-cols-3">
                {section.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-black/10 bg-white/70 p-3 text-sm dark:border-white/10 dark:bg-black/35"
                  >
                    <p className="font-medium text-black dark:text-white">{ex.desc}</p>
                    <code className="mt-1 block rounded-md bg-black/5 px-2 py-1 font-mono text-xs text-black dark:bg-white/10 dark:text-white break-words whitespace-pre-wrap">
                      {ex.query}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 rounded-2xl border border-black/10 bg-white/50 p-6 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Advanced techniques</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-black/70 dark:text-white/70">
          <li>
            Chain pipes for multi-step transforms: <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs text-black dark:bg-white/10 dark:text-white">Reservations[].Instances[] | [?State.Name=='running'] | [].InstanceId</code>
          </li>
          <li>
            Use functions: <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs text-black dark:bg-white/10 dark:text-white">sort_by(Functions, &MemorySize)[].FunctionName</code>
          </li>
          <li>
            Normalize tags: <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs text-black dark:bg-white/10 dark:text-white">Tags[?Key=='Name'].Value | [0] || 'n/a'</code>
          </li>
          <li>
            Convert booleans/flags: <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs text-black dark:bg-white/10 dark:text-white">{`{Id: InstanceId, IsRunning: State.Name=='running'}`}</code>
          </li>
          <li>
            Limit results: <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs text-black dark:bg-white/10 dark:text-white">Functions[:5]</code>
          </li>
        </ul>
      </section>

      <section className="mt-10 grid gap-3 rounded-2xl border border-black/10 bg-white/50 p-6 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Troubleshooting</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-black/70 dark:text-white/70">
          <li>Invalid JSON? Re-run the CLI without pipes to ensure valid JSON before adding --query.</li>
          <li>Empty result? Confirm key casing; AWS outputs often use PascalCase.</li>
          <li>Large payloads? Add server-side filters (e.g., --filters for EC2) before JMESPath.</li>
          <li>Need CSV? Keep --output json and use the <Link href="/jmespath/create-csv" className="font-semibold text-emerald-600 dark:text-emerald-300">JMESPath create CSV</Link> page for clean downloads.</li>
        </ul>
      </section>

      <Faq items={faqItems} />
    </Container>
  );
}
