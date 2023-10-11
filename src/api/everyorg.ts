/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "../config/env";
// use fetch because fetch use request instead of XMLHttp request which can better due with cors
export const getNonProfitDetails = (identifier: string): Promise<TDetailResult> => {
	return fetch(`https://partners.every.org/v0.2/nonprofit/${identifier}?apiKey=${env.VITE_API_KEY}`, {
		mode: "cors",
	})
		.then((res) => res.json())
		.then((res) => res.data);
};
export const searchNonProfit = (searchTerm: string) => {
	return fetch(`https://partners.every.org/v0.2/search/${searchTerm}?apiKey=${env.VITE_API_KEY}`, {
		mode: "cors",
	}).then((res) => res.json());
};
export const browseNonProfit = (cause: string, take: number = -1): Promise<TBrowseResult> => {
	return fetch(
		`https://partners.every.org/v0.2/browse/${cause}?apiKey=${env.VITE_API_KEY}${take > 0 ? `&take=${take}` : ""}`,
		{
			mode: "cors",
		}
	).then((res) => res.json());
};

export type TBrowseResult = Record<string, TOrganizationSummary[]>;
export type TOrganizationSummary = {
	coverImageUrl: string;
	description: string;
	location: string;
	ein: string;
	logoCloudinaryId: string;
	logoUrl: string;
	matchedTerms: string[];
	name: string;
	profileUrl: string;
	slug: string;
	tags: string[];
};

export type TDetailResult = {
	nonprofit: Nonprofit;
	nonprofitTags: NonprofitTag[];
};

export interface Nonprofit {
	id: string;
	name: string;
	isDisbursable: boolean;
	locationAddress: string;
	locationLatLng: LocationLatLng;
	ein: string;
	description: string;
	descriptionLong: string;
	primarySlug: string;
	logoCloudinaryId: string;
	coverImageCloudinaryId: string;
	nteeCode: any;
	nteeCodeMeaning: any;
	hasAdmin: boolean;
	directDisbursement: boolean;
	websiteUrl: string;
	metadata: any;
	logoUrl: string;
	coverImageUrl: string;
	profileUrl: string;
}

export interface LocationLatLng {
	type: string;
	coordinates: number[];
}

export interface NonprofitTag {
	id: string;
	tagName: string;
	causeCategory: string;
	title: string;
	tagImageCloudinaryId: string;
	tagUrl: string;
	tagImageUrl: string;
}
