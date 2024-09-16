/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { evalRun as evalRunUtil } from '@genkit-ai/tools-common/eval';
import { runInRunnerThenStop } from '@genkit-ai/tools-common/utils';
import { Command } from 'commander';

interface EvalRunCliOptions {
  output?: string;
  evaluators?: string;
  force?: boolean;
  outputFormat: string;
}

/** Command to run evaluation on a dataset. */
export const evalRun = new Command('eval:run')
  .description('evaluate provided dataset against configured evaluators')
  .argument(
    '<dataset>',
    'Dataset to evaluate on (currently only supports JSON)'
  )
  .option(
    '--output <filename>',
    'name of the output file to write evaluation results. Defaults to json output.'
  )
  .option(
    '--output-format <format>',
    'The output file format (csv, json)',
    'json'
  )
  .option(
    '--evaluators <evaluators>',
    'comma separated list of evaluators to use (by default uses all)'
  )
  .option('--force', 'Automatically accept all interactive prompts')
  .action(async (dataset: string, options: EvalRunCliOptions) => {
    await runInRunnerThenStop(async (runner) => {
      return await evalRunUtil(runner, dataset, {
        ...options,
        interactive: !options.force,
      });
    });
  });
