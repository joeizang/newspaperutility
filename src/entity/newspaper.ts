import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne
} from 'typeorm';
import { PriceCatalog } from './priceCatalog';

@Entity()
export class Newspaper
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text"})
    name: string;

    @Column({type: "decimal"})
    minPrice: number;

    @Column({type: "decimal"})
    maxPrice: number;

    @ManyToOne(type => PriceCatalog, priceCatalog => priceCatalog.newspapers, {
        cascade: false, nullable: true
    })
    priceCatalog: PriceCatalog;
}
