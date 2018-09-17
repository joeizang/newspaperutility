
import {
    PrimaryGeneratedColumn, Column, Entity, ManyToOne
} from 'typeorm';
import { PriceCatalog } from './priceCatalog';

@Entity()
export class PriceCode
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text", length: 5 })
    name: string;

    @Column({ type: "smallmoney" })
    amount: number;

    @ManyToOne(type => PriceCatalog, { nullable: true, cascade: false})
    priceCatalog: PriceCatalog;
}

