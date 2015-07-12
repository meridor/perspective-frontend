import {Instance} from '../models/instance';

export function mainArea(): string;
export function header(context: any, options?: any): string;
export function mainLayout(context: any, options?: any): string;

export function instanceEntry(context: Instance): string;
export function instancesTable(): string;
export function instancesGroup(context: any): string;
export function instancesSection(context: any): string;